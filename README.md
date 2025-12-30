# 📱 UB Task App

<img width="1920" height="1080" alt="Pitch UB Task - Auditorio" src="https://github.com/user-attachments/assets/9c9e1566-1d1c-4044-952f-3240e83b8c5a" />

UB Task App é um aplicativo mobile desenvolvido em **React Native + Expo** para facilitar o acompanhamento de tarefas acadêmicas da UB Virtual, com visual moderno e integração com a API UB Task.

---

## 📚 Tabela de Conteúdos

- [📖 Visão Geral](#-visão-geral)
- [🛠 Tecnologias](#-tecnologias)
- [⚙️ Configuração](#️-configuração)
  - [📋 Pré-requisitos](#-pré-requisitos)
  - [⬇️ Instalação](#️-instalação)
  - [🎬 Execução Local](#-execução-local)
  - [📦 Gerar APK (Android)](#-gerar-apk-android)
- [📒 Sobre](#-sobre)
- [👨‍💻 Desenvolvedores](#-desenvolvedores)

---

## 📖 Visão Geral

O UB Task App permite:

- Visualizar tarefas acadêmicas da UB Virtual com detalhes de matéria, título, prazos e status.
- Login seguro e armazenamento local de dados.
- Interface responsiva e navegação intuitiva.

Ideal para estudantes que desejam organizar e acompanhar suas atividades acadêmicas de forma prática.

---

## 🛠 Tecnologias

- **React Native** & **Expo**
- **TypeScript**
- **Expo Router** (navegação)
- **Expo Secure Store** (armazenamento seguro)
- **React Hook Form** (formulários)
- **Day.js** (datas)
- **@expo-google-fonts/poppins** (tipografia)

---

## ⚙️ Configuração

### 📋 Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x ou yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- (Para build) [EAS CLI](https://docs.expo.dev/eas/)

### ⬇️ Instalação

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/Sonata-dos-Bytes/ub-task-app.git
   cd ub-task-app
   ```

2. Instale as dependências:
   ```bash
   npm install --force
   # ou
   yarn
   ```

### 🎬 Execução Local

1. Inicie o app em modo desenvolvimento:
   ```bash
   npx expo start
   ```
   - Use um emulador Android/iOS ou o app Expo Go (com limitações).

2. Para testar recursos nativos, use um **development build**:
   ```bash
   npx expo run:android
   # ou
   npx expo run:ios
   ```

### 📦 Gerar APK (Android)

1. Gere o APK para Android (produção):
   ```bash
   eas build -p android --profile preview --local
   ```
   O arquivo `.apk` estará disponível na pasta de saída indicada pelo EAS.

2. Para builds de preview ou distribuição interna, ajuste o perfil no arquivo `eas.json`.

---

## 📒 Sobre

Desenvolvido por Sonata dos Bytes.  
Contato: pedro.henrique.martins404@gmail.com  
Repositório: https://github.com/Sonata-dos-Bytes/ub-task-app

---

## 👨‍💻 Desenvolvedores

- [@Erikli999](https://github.com/Erikli999) — Erikli999  
- [@guilherme-felipe123](https://github.com/guilherme-felipe123) — Guilherme Felipe  
- [@luanklo](https://github.com/luanklo) — Luan Jacomini Kloh  
- [@Matheuz233](https://github.com/Matheuz233) — Matheus Augusto  
- [@piedro404](https://github.com/piedro404) — Pedro Henrique Martins Borges  
- [@thayna-bezerra](https://github.com/thayna-bezerra) — Thayna Bezerra  
