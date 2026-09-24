@echo off
title ValorantUnveil - Servidor
cd /d "%~dp0"

echo.
echo  === ValorantUnveil ===
echo.

if not exist "target\course-0.0.1-SNAPSHOT.jar" (
    echo  JAR nao encontrado. Compilando pela primeira vez...
    set "MVN=%USERPROFILE%\.vscode\extensions\oracle.oracle-java-25.0.1\nbcode\java\maven\bin\mvn.cmd"
    if not exist "%MVN%" set "MVN=%USERPROFILE%\.vscode\extensions\oracle.oracle-java-26.0.0\nbcode\java\maven\bin\mvn.cmd"
    "%MVN%" package -DskipTests -q 2>nul
    if errorlevel 1 (
        echo  ERRO na compilacao!
        pause
        exit /b 1
    )
    echo  Compilacao OK!
    echo.
)

echo  Iniciando servidor...
echo  Acesse: http://localhost:8080/Valoagents.html
echo  Para parar: Ctrl+C
echo.

start "" "http://localhost:8080/Valoagents.html"
java -jar target\course-0.0.1-SNAPSHOT.jar

echo.
echo  Servidor encerrado.
pause
