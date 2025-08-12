import { IProjectInterface, Project } from "../model/projectModel";

export const mobile: IProjectInterface[] = [
    new Project(32, "/assets/thumbnail/arcusApp.webp", "Arcus", "mobile", "Aplicatico Android para registro de hábitos.", ["TypeScript", "React Native", "Expo Go", "Expo Router", "AppWrite"]),
    new Project(21, "/assets/thumbnail/myMoneyApp.webp", "MyMoney APP", "mobile", "Aplicativo móvel para registro e gerenciamento de finanças pessoais.", ["React Native", "Styled Components", "TypeScript", "Expo Go", "Expo Router"]
    ),
    new Project(20, "/assets/thumbnail/usersList.webp", "Users", "mobile", "Aplicativo para cadastro e gerenciamento de usuários.", ["Dart", "Flutter"]
    ),
    new Project(19, "/assets/thumbnail/pomodoro.webp", "Pomodoro APP", "mobile", "Aplicativo móvel para gerenciamento de atividades utilizando a técnica Pomodoro.", ["Dart", "Flutter", "Drift", "Flutter Riverpod"]
    ),
    new Project(18, "/assets/thumbnail/smartSearch.webp", "Smart Search", "mobile", "Aplicativo para buscas rápidas e eficientes de informações.", ["React Native", "Expo Go", "TypeScript", "Stylesheets"]
    ),
    new Project(15, "/assets/thumbnail/imc.webp", "IMC Calculator", "Web", "Aplicação web interativa e moderna para calcular o Índice de Massa Corporal (IMC), com design responsivo e foco na experiência mobile.", ["HTML", "CSS", "JavaScript", "Mobile First"], "https://myimc2025.netlify.app/"
    ),
];