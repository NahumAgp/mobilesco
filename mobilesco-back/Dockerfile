# Usamos imagen ligera de Java 21
FROM eclipse-temurin:21-jdk-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos el jar
COPY target/mobilesco-back-0.0.1-SNAPSHOT.jar app.jar

# Puerto que expone
EXPOSE 8081

# Comando de ejecución
ENTRYPOINT ["java","-jar","app.jar"]