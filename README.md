# SIM/eSIM Lifecycle Manager

Tento projekt je vytvorený na účely školského zadania z Angularu. Používa **jeden** Angular projekt, ktorý volá vlastné Spring Boot REST API.

Cieľom je evidencia a správa SIM kariet (`SimCard`) a zákazníkov (`Customer`) vrátane prihlasovania, CRUD operácií, validácií a odchytávania chýb.

## 1. Požiadavky

Pred spustením sa uisti, že máš nainštalované:

| Nástroj | Verzia (odporúčaná) |
| --- | --- |
| [Node.js](https://nodejs.org/) | >= 20.x |
| [Angular CLI](https://angular.io/cli) | >= 18.x |
| [JDK](https://adoptium.net/) | 21 |
| [Maven](https://maven.apache.org/) | >= 3.9.x |
| [Docker](https://www.docker.com/) / [Docker Desktop](https://www.docker.com/products/docker-desktop/) | aktuálna |
| [Git](https://git-scm.com/) | aktuálna |

## 2. Štruktúra repozitára

```text
sim-esim-lifecycle-manager/
├── backend/        # Spring Boot REST API
├── frontend/       # Angular SPA (jeden projekt)
├── docker-compose.yml
├── README.md
└── VYSVETLENIE_KODU_PRE_OBHAJUBU.txt
```

## 3. Spustenie projektu (lokálne)

Projekt sa skladá z 3 častí: **PostgreSQL (Docker)**, **Backend (Spring Boot)**, **Frontend (Angular)**.

### Krok 1: Naklonovanie repozitára

```bash
git clone <tvoj-git-repo-url>
cd sim-esim-lifecycle-manager
```

### Krok 2: Spustenie PostgreSQL cez Docker

V koreňovom adresári projektu spusti:

```bash
docker compose up -d
```

Over, že kontajner beží:

```bash
docker ps
```

Mala by sa zobrazovať kontajner s názvom `simesim-db`.

### Krok 3: Spustenie Backendu (Spring Boot)

Prejdi do backend adresára:

```bash
cd backend
```

Spusti aplikáciu pomocou Maven:

```bash
mvn spring-boot:run
```

Backend bude dostupný na:

```
http://localhost:8080
```

Pri prvom štarte sa automaticky spustia **Flyway migrácie**. Vytvorí sa schéma, tabuľky, testovací používateľ a vzorové dáta (niekoľko `SimCard` a `Customer`).

### Krok 4: Spustenie Frontendu (Angular)

Otvori nový terminál a prejdi do frontend adresára:

```bash
cd frontend
```

Nainštaluj závislosti (iba prvýkrát):

```bash
npm install
```

Spusti dev server:

```bash
ng serve
```

Frontend bude dostupný na:

```
http://localhost:4200
```

## 4. Testovací účet na prihlásenie

Po spustení backendu môžeš použiť nasledujúci testovací účet:

| Pole | Hodnota |
| --- | --- |
| **Používateľské meno** | `admin` |
| **Heslo** | `admin123` |

Po úspešnom prihlásení sa token uloží do `localStorage` a bude automaticky posielaný cez `Authorization: Bearer <token>` pomocou `auth.interceptor`.

## 5. Kde nájsť vysvetlenia na obhajobu

**NAJMÄ DÔLEŽITÉ:** Celé podrobné vysvetlenie kódu riadok po riadku nájdeš v súbore:

```text
VYSVETLENIE_KODU_PRE_OBHAJUBU.txt
```

Ten súbor je generovaný priamo ku tomuto projektu a slúži na to, aby si vedel presne povedať:
- čo robí ktorý súbor
- čo robí daný riadok/kódový blok
- prečo sa nachádza v projekte
- ako spolu súvisia frontend + backend

Odporúčam si ho prečítať **pred** prezentáciou/obhajobou.

## 6. Splnené požiadavky zo zadania

| Požiadavka | Stav |
| --- | --- |
| Zobrazovanie zoznamu entít | ÁNO (`/sims`, `/customers`) |
| Všetky CRUD operácie pre vlastné entity cez REST | ÁNO (`SimCard`, `Customer`) |
| Prihlasovací formulár + uloženie prihlásenia cez `localStorage` + použitie autentifikácie | ÁNO (`login`, `AuthService`, `auth.interceptor`) |
| Formuláre na pridanie/úpravu cez **signálne formuláre** + validátory | ÁNO (`sim-form`, `customer-form`) |
| Odchytávanie všetkých chýb komunikácie so serverom + user-friendly text do DOM (nie do konzoly) | ÁNO (`error.interceptor`, `ErrorService`, `error-alert`) |
| Použitie aspoň jedného route guardu | ÁNO (`auth.guard`) |
| Komunikácia rodič-dieťa (`@Input`, `@Output`) | ÁNO (`sim-list-item` komponenta) |
| Jeden Angular projekt | ÁNO |
| Projekt na Githube/Gitlabe + prístup na čítanie | Pripravené na push |
| Inštalačná príručka + návod na spustenie REST servera na localhost | ÁNO (tento `README.md`) |

## 7. Rýchle overenie funkčnosti

1. Otvor `http://localhost:4200/login` a prihlás sa (`admin` / `admin123`)
2. Choď do `SIM karty` -> vidíš zoznam načítaný zo servera
3. Skús pridať novú SIM kartu cez formulár (používa **signálne formuláre** + validáciu)
4. Prejdi na `Zákazníci` a vyskúšaj CRUD aj pre druhú entitu
5. Skús získať chránenú stránku bez tokenu -> presmeruje ťa na `/login` (funguje `auth.guard`)
6. V prípade chyby zo servera sa zobrazí **červený alert v DOM**, žiaden výpis do konzoly

## 8. Poznámka

Na Angular strane je dôraz kladený práve na tie požadované techniky. Doménové veci typu detailný lifecycle engine sú ponechané v jednoduchšej podobe, aby bol projekt priamo použiteľný pre toto školské zadanie.
