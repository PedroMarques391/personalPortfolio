"use client";
import { useForm } from "react-hook-form";

import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseTime from "@/components/Motions/ContactMotion";
import UseAnimationFrame from "@/components/Motions/AnimationFrame";
import { FaSpinner } from "react-icons/fa";
import Modal from "@/components/UI/Modal";
import SectionHeader from "@/components/UI/SectionHeader";
import { insertMaskInPhone } from "@/utils/functions/phoneMask";

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("Digite um email válido."),
    phone: z.string().min(1, "O telefone é obrigatório").refine((value) => /^[\d\(\)\-\s]{14,15}$/.test(value), {
        message: "Numero de telefone invalido"
    }),
    message: z.string().min(1, "A mensagem é obrigatória."),
});

type FormData = z.infer<typeof schema>;

interface IMessageInterface {
    title: string
    subtitle: string
    content: string
    success: boolean
}

const Contact = (): React.JSX.Element => {
    const [pending, setPending] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [message, setMessage] = useState({
    } as IMessageInterface);
    const { register, handleSubmit, formState: { errors }, reset, setValue, clearErrors } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    function handleContact(data: FormData) {
        setPending(true);
        fetch('/api/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                setShowModal(true);
                setMessage({
                    title: "Mensagem Enviada com Sucesso!",
                    subtitle: "Obrigado por entrar em contato conosco.",
                    content: "Sua mensagem foi enviada com sucesso. Em breve entraremos em contato.",
                    success: true,
                });
            })
            .catch(() => {
                setShowModal(true);
                setMessage({
                    title: "Erro ao Enviar Mensagem",
                    subtitle: "Ocorreu um problema ao enviar sua mensagem.",
                    content: "Tente novamente mais tarde ou entre em contato diretamente pelo instagram.",
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
        setValue('phone', formattedPhone);
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
            {showModal && <Modal
                onClose={() => setShowModal(false)}
                title={message.title}
                subtitle={message.subtitle}
                success={message.success}>{message.content}</Modal>}

            <SectionHeader
                title="Entre em Contato"
                subtitle="Gostou do que viu?"
                styles="mt-40"
            />

            <section className='w-full grid grid-cols-1 md:grid-cols-2 mt-10'>
                <div className="hidden md:flex w-full justify-center items-center">
                    <UseAnimationFrame />
                    <UseAnimationFrame />
                </div>
                <div className='w-full flex flex-col justify-center items-center '>
                    <form onSubmit={handleSubmit(handleContact)} className='md:pt-10 pb-16 w-full flex flex-col justify-center items-center gap-6 rounded-2xl '>
                        <Input
                            duration={0.5}
                            {...register('name')}
                            error={errors.name?.message}
                            label='Nome' />
                        <Input
                            duration={1.0}
                            {...register('email')}
                            error={errors.email?.message}
                            label='Email' />
                        <Input
                            duration={1.5}
                            {...register('phone')}
                            error={errors.phone?.message}
                            label='Telefone'
                            maxLength={15}
                            onChange={handleMask}
                        />
                        <Input.TextArea
                            duration={2.0}
                            {...register('message')} label='Mensagem' />

                        <Button disabled={pending} styles="bg-gray-light border border-transparent text-gray-soft py-3 px-6 rounded-sm hover:scale-105 ">
                            {pending ? (
                                <>
                                    Enviando
                                    <FaSpinner className="animate-spin mr-2" />
                                </>
                            ) : (
                                "Enviar"
                            )}
                        </Button>

                    </form>
                </div>
            </section >
        </section>
    );
};

export default Contact;