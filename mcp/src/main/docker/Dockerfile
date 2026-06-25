FROM registry.access.redhat.com/ubi9/openjdk-25:1.24

ARG PROJECT_VERSION
ARG BUILD_DATE

ENV LANGUAGE='en_US:en'

LABEL org.opencontainers.image.title="capacitor-calendar-mcp"
LABEL org.opencontainers.image.description="MCP server for the @ebarooni/capacitor-calendar"
LABEL org.opencontainers.image.source="https://github.com/ebarooni/capacitor-calendar/mcp"
LABEL org.opencontainers.image.url="https://barooni.dev"
LABEL org.opencontainers.image.version="${PROJECT_VERSION}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.licenses="MIT"

# Four distinct layers so library layers are reused on app-only changes
COPY --chown=185 quarkus-app/lib/ /deployments/lib/
COPY --chown=185 quarkus-app/*.jar /deployments/
COPY --chown=185 quarkus-app/app/ /deployments/app/
COPY --chown=185 quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"

ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]