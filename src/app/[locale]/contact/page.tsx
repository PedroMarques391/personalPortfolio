"use client";
import { useForm } from "react-hook-form";

import UseAnimationFrame from "@/components/Motions/AnimationFrame";
import UseTime from "@/components/Motions/ContactMotion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast/index";
import { insertMaskInPhone } from "@/utils/phoneMask";
import { ContactData, createContactScheme } from "@/validations/contact.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export interface IMessageInterface {
  title: string;
  subtitle: string;
  content: string;
  success: boolean;
}

const Contact = (): React.JSX.Element => {
  const t = useTranslations("pages.contact");
  const validationT = useTranslations("validations.contact");
  const [pending, setPending] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState({} as IMessageInterface);
  
  const schema = useMemo(() => createContactScheme(validationT), [validationT]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm<ContactData>({
    resolver: zodResolver(schema),
  });

  function handleContact(data: ContactData) {
    setPending(true);
    fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setShowModal(true);
        setMessage({
          title: t("successTitle"),
          subtitle: t("successSubtitle"),
          content: t("successContent"),
          success: true,
        });
      })
      .catch(() => {
        setShowModal(true);
        setMessage({
          title: t("errorTitle"),
          subtitle: t("errorSubtitle"),
          content: t("errorContent"),
          success: false,
        });
      })
      .finally(() => {
        setPending(false);
        reset();
      });
  }

  function handleMask(e: React.ChangeEvent<HTMLInputElement>): void {
    const formattedPhone: string = insertMaskInPhone(e.target.value);
    setValue("phone", formattedPhone);
    clearErrors("phone");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <section className="w-full flex flex-col justify-center items-center relative overflow-hidden">
      <UseTime />

      <Toast.Root type={message.success ? "success" : "error"} open={showModal}>
        <Toast.ActionButton onClick={() => setShowModal(false)}>
          <Toast.Icon icon={GrClose} color="red" size={20} />
        </Toast.ActionButton>
        <Toast.Title>{message.title}</Toast.Title>
        <Toast.Subtitle>{message.subtitle}</Toast.Subtitle>
        <Toast.Content>
          <p>{message.content}</p>
        </Toast.Content>
      </Toast.Root>

      <SectionHeader
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        styles="mt-40"
      />

      <section className="w-full grid grid-cols-1 md:grid-cols-2 mt-10">
        <div className="hidden md:flex w-full justify-center items-center">
          <UseAnimationFrame />
          <UseAnimationFrame />
        </div>
        <div className="w-full flex flex-col justify-center items-center ">
          <form
            onSubmit={handleSubmit(handleContact)}
            className="md:pt-10 pb-16 w-full flex flex-col justify-center items-center rounded-2xl "
          >
            <Input
              duration={0.5}
              {...register("name")}
              error={errors.name?.message}
              label={t("nameLabel")}
              className="mb-10"
            />
            <Input
              duration={1.0}
              {...register("email")}
              error={errors.email?.message}
              label={t("emailLabel")}
            />
            <Input
              duration={1.5}
              {...register("phone")}
              error={errors.phone?.message}
              label={t("phoneLabel")}
              maxLength={15}
              onChange={handleMask}
            />
            <Input.TextArea
              duration={2.0}
              {...register("message")}
              label={t("messageLabel")}
            />

            <Button
              disabled={pending}
              styles="bg-gray-light border border-transparent text-gray-soft py-3 px-6 rounded-sm hover:scale-105 "
            >
              {pending ? (
                <>
                  {t("submittingText")}
                  <FaSpinner className="animate-spin mr-2" />
                </>
              ) : (
                t("submitText")
              )}
            </Button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Contact;
