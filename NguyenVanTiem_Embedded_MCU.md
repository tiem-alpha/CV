# Nguyễn Văn Tiệm
**Embedded Software Engineer**

 Hanoi, Vietnam - nguyentiem21101998@gmail.com -  0355 180 555

---

##  Professional Summary

> **5+ years** of embedded system software development and  IoT with US and European companies · Experienced in risk management, code review, and teamwork across multi-functional teams.

---

## Technical Expertise

| Category | Details |
|---|---|
| **Languages** | C, C++, Python, Java, Kotlin, Bash, Makefile |
| **Microcontrollers** | ESP32, STM32, Nordic nRF52, Silabs, Renesas, Toshiba, Abov, AVR |
| **Wireless Tecnologies** | Bluetooth, OpenThread, Zigbee, Z-Wave, Sidewalk, Wi-Fi , Cellular|
| **Protocol** | MQTT, WebSocket, HTTP, BLE, Matter over Thread, 2G, 4G follow 3GPP standard|
| **Peripherals** | UART, I2C, SPI, ADC, DAC, DMA, Timer, PWM |
|**ARM cortex**| Systick, NVIC, Trustzone, MPU|
| **Embedded OS** | ZephyrOS, FreeRTOS |
| **Coding Standard** | MISRA C |
| **IDE** | Keil, IAR,  Simplicity Studio 5, STM32CubeIDE, E2 Studio, Arduino IDE, Eclipse|
| **Toolchain/Compiler** | GCC ARM, ESP-IDF, nRF Connect SDK|
|**Build Tool**| Make, Ninja |
| **Debuger** | IAR, STM32IDE, Ozone Debugger, Logic Analyzer |
| **Version Control System** | Git (GitHub/GitLab), SVN, Jira, Docker, Linux, , Logic Analyzer |
| **Algorithms & DS** | BFS, DFS, Backtracking, Heap, Stack, Queue, Tree, Trie, Priority Queue, Hash Map |
| **Languages** | English (Reading technical docs, basic communication) |


---

## Professional Experience

### FPT Software — Embedded Developer
`04/2026 – present`

**Project**: Developed firmware for a cellular modem management module in a smart meter, supporting both 2G and 4G network technologies.

- Implemented the modem FOTA (Firmware Over-The-Air) feature.
- Implemented UART DMA using the linked-list DMA mode on the STM32H573.
- Implemented the modem power control flow.
- Produced software design documentation based on system requirements, including software architecture, data flow diagrams, sequence diagrams, state machines, and detailed flowcharts for each state.
- Proposed technical and algorithmic solutions and provided implementation guidance to team members.
- Reviewed code written by team members and provided technical feedback.
- Optimized RAM usage, including static RAM and stack memory, as well as Flash memory usage.

**MCU**:  STM32H573
**OS**: FreeRTOS
**Document Management System**: Confluence
**VCS**: GitLab, Jira
**Language**: C, C++, Python
**IDE/Debuger:**  Keil-C

### LGEDV — Main Embedded Developer 
`04/2025 – 04-2026`

**Project:** Washing machine firmware for wash-only, wash towel, and wash & dry (Heat pump) models.

- Analyzed legacy code flows and designed new logic ensuring backward compatibility
- Analyzed Black Box, verify that the product met all functional requirements and operated in accordance with the Software Requirements Specification (SRS).
- Implemented a PWM timer-based audio playback module to generate notification melodies according to the Product Requirements Document (PRD), and developed drum light effects with configurable brightness levels.
- Developed an anti-vibration control algorithm for a washing machine during high-speed spin cycles using the BMI320 inertial sensor to detect and mitigate excessive vibration.
- Stored user configuration data in EEPROM; synchronized machine status to server
- Wrote and executed test cases before handover to SQE team
- Fixed bugs in legacy firmware versions; reviewed code for team members

**MCU**:  Abov, Toshiba, Renesas MCUs
**Document Management System**: colab
**VCS**: SVN, GitLab, Jira
**Language**: C, Python
**IDE/Debuger:**  IAR, E2 Studio 

---

### FPT Software — Embedded Developer
`12/2023 – 04/2025`

**Project:** Garage door with BLE, Wi-Fi & Matter wireless integration (ZephyrOS, nRF platform).

- Defined device tree for custom board; performed board bring-up from schematics
- Implemented OTA via BLE with custom external flash; OTA for motherboard via BLE & UART
- Implemented ECDH security to establish secure BLE channel; designed BLE message protocol
- Integrated FAT & LittleFS for user/door config/log management
- Ported Matter Door Lock & Window Covering profiles; launched Matter Hub on Raspberry Pi 4
- Developed the RX8130CE RTC (I²C) driver and implemented a time-based scheduling engine to execute scheduled actions, such as automatic door opening and closing at predefined times.
-  Integrated the NINA-W132 Wi-Fi module and implemented MQTT communication with AWS IoT Core for secure remote device monitoring and control.
- Optimized RAM/Flash usage; tuned mutex, queue, and buffer performance

**Tech:** C, C++, Python, Bash, Makefile · ZephyrOS · BLE, Matter, Wi-Fi · Docker, RPi, AWS IoT Core · Jira, Git, nRF Connect, Ozone debugger

---

### FPT Software — Embedded Engineer (R&D)
`10/2023 – 11/2023`

**Focus:** Nordic SDK, Zigbee, Sidewalk, Matter over Thread

- Studied Nordic SDK; implemented Zigbee switch/light cluster on dev board
- Prototyped Matter Door Lock on Silicon Labs; launched Matter Hub on RPi & laptop
- Built bootloader and launched Linux on BeagleBone
- Upgraded SDK and fixed issues in existing door lock project

**Tech:** C, C++ · Zigbee, Sidewalk, Matter/Thread · Simplicity Studio, Docker, GitHub

---

### FPT Software — Embedded Engineer
`04/2023 – 09/2023`

**Project:** Door Lock with Z-Wave wireless technology.

- Analyzed and optimized device power consumption
- Mapped Z-Wave command classes to TLV format for customer integration
- Set up Z-sniffer and self-test tools for Z-Wave certification process

**Tech:** C, Python · Z-Wave, RTOS · Simplicity Studio, Ozone, Logic Analyzer

---

### Samsung Vietnam Mobile Centre — Android Developer
`04/2021 – 03/2023`

**Projects:** Samsung app maintenance, PDF reader app, automated testing app.

- Maintained Samsung production applications
- Developed a full-featured PDF reader application
- Built an automated testing Android application

**Tech:** Java, Kotlin · Android SDK (Activity, Fragment, Service, BroadcastReceiver) · RxJava, SQLite, Design Patterns

---



## Personal Projects

| Project | Description |
|---|---|
| **Secure Bootloader & DFU — STM32** | Designed and implemented a secure bootloader for the STM32F103 using ECDSA with the NIST P-256 curve for firmware signing and signature verification, a dual-bank firmware update mechanism, and power-loss protection to ensure secure and reliable firmware updates. |
| **Cryto library** | Designed and implemented optimized cryptographic libraries for the STM32F103, including ECDSA over NIST P-256, X25519-based ECDH key agreement, and AES-128-GCM authenticated encryption, with a strong focus on execution speed, Flash footprint, and memory efficiency. |
| **Apply Edge AI on ESP32** | Developed an embedded TinyML application on the ESP32 using Edge Impulse to train, deploy, and run a machine learning model locally for motion classification based on MPU6050 IMU sensor data. Collected and labeled motion datasets, trained and optimized the model, and implemented real-time inference to classify left, right, up, down, and circular gestures.|
| **Keypad Driver — STM32U585** | IQS7222B touch scanning + TCA8418 button LEDs via I2C |
| **Sensor Drivers via I2C** | MPU6050, LIS2, HTS221, LPS22; DMA peripheral communication on STM32F411 |
| **OTA via BLE — nRF52840** | Bluetooth OTA using internal and external flash |
| **LCD G9A01 Driver** | SPI driver implementation for STM32H532 |
| **NOR Flash Winbond 25Q64** | External flash driver via SPI for STM32H532 |

---

## Education

**B.Eng. Computer Engineering** — 2016–2021
Hanoi University of Science and Technology (HUST), Vietnam

---

## Certifications

- **STP Level Pro** — Samsung Talent Programmer
- **SPCT** — LGEDV
