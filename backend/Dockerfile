FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -q -DskipTests package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "if [ -n \"$DATABASE_URL\" ]; then export JDBC_DATABASE_URL=\"$(printf '%s' \"$DATABASE_URL\" | sed -E -e 's|^postgres(ql)?://|jdbc:postgresql://|' -e 's|^jdbc:postgresql://[^@]*@|jdbc:postgresql://|')\"; fi; exec java -jar /app/app.jar"]
