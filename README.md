# BTL_DACN
--backend 
#require maven and java
cd backend
mvn clean install
mvn spring-boot:run
#working in src/main/java/com/example/demo/ directory

--frontend
#require nodejs
cd frontend
npm install
npm run dev
#working in src directory
