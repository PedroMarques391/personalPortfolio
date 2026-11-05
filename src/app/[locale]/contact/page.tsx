"use client";
import { useForm } from "react-hook-form";

import UseAnimationFrame from "@/components/Motions/AnimationFrame";
import UseTime from "@/components/Motions/ContactMotion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";
import { FeedbackToast } from "@/components/ui/Toast";
import { useToastFeedback } from "@/hooks/useToastFeedback";
import { insertMaskInPhone } from "@/utils/phoneMask";
import { ContactData, createContactScheme } from "@/validations/contact.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Contact = (): React.JSX.Element => {
  const t = useTranslations("pages.contact");
  const validationT = useTranslations("validations.contact");
  const [pending, setPending] = useState<boolean>(false);
  const { open, message, triggerToast, closeToast } = useToastFeedback();

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

  async function handleContact(data: ContactData) {
    setPending(true);
    try {
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      triggerToast({
        title: t("successTitle"),
        subtitle: t("successSubtitle"),
        content: t("successContent"),
        success: true,
      });
      reset();
    } catch {
      triggerToast({
        title: t("errorTitle"),
        subtitle: t("errorSubtitle"),
        content: t("errorContent"),
        success: false,
      });
    } finally {
      setPending(false);
    }
  }

  function handleMask(e: React.ChangeEvent<HTMLInputElement>): void {
    const formattedPhone: string = insertMaskInPhone(e.target.value);
    setValue("phone", formattedPhone);
    clearErrors("phone");
  }

  return (
    <section className="w-full flex flex-col justify-center items-center relative overflow-hidden">
      <UseTime />

      <FeedbackToast open={open} message={message} onClose={closeToast} />

      <SectionHeader
        as="h1"
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        styles="mt-40"
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 mt-10">
        <div
          aria-hidden="true"
          className="hidden md:flex w-full justify-center items-center"
        >
          <UseAnimationFrame />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <form
            noValidate
            onSubmit={handleSubmit(handleContact)}
            className="md:pt-10 pb-16 w-full flex flex-col justify-center items-center rounded-2xl"
          >
            <Input
              duration={0.4}
              {...register("name")}
              error={errors.name?.message}
              label={t("nameLabel")}
              className="mb-10"
            />
            <Input
              duration={0.6}
              type="email"
              {...register("email")}
              error={errors.email?.message}
              label={t("emailLabel")}
            />
            <Input
              duration={0.8}
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
              label={t("phoneLabel")}
              maxLength={15}
              onChange={handleMask}
            />
            <Input.TextArea
              duration={1.0}
              {...register("message")}
              error={errors.message?.message}
              label={t("messageLabel")}
            />

            <Button
              type="submit"
              disabled={pending}
              styles="bg-gray-light border border-transparent text-gray-soft py-3 px-6 rounded-sm hover:scale-105 disabled:opacity-50"
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
      </div>
    </section>
  );
};

export default Contact;
