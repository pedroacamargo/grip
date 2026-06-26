<p align="center">
  <img src="./assets/imgs/logo.png" alt="Kouci logo" width="160" />
</p>

<h1 align="center">Kouci</h1>

<p align="center">Water polo analytics and tactics, built for teams.</p>

## About

Kouci helps water polo teams keep track of their players and turn match information into useful insights. Coaches can manage player statistics, use a tactics board to plan plays, and share tactic videos with players so everyone arrives prepared.

## Tech stack

- [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/) for iOS, Android, and web
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- [Expo SQLite](https://docs.expo.dev/versions/v55.0.0/sdk/sqlite/) for on-device data storage
- [Drizzle ORM](https://orm.drizzle.team/) for typed database queries and migrations
- Expo Image and SF Symbols for the interface

## Run locally

```bash
npm install
npx expo start
```

```bash
# Create a new migration after editing the database schema
npx drizzle-kit generate

# Build the .apk for Android
npx expo run:android
```
