declare namespace NodeJS {
  interface ProcessEnv {
    USER_EMAIL: string;
    USER_PASS: string;
    ADDRESSEE: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    JWT_SECRET: string;
    DATABASE_PORT: number;
  }
}
