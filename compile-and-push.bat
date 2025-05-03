@echo off
:: compile-and-push.bat - Compile all documents locally and push to GitHub

echo ===== Compiling and Pushing Codex =====

:: Check if LaTeX is installed
where pdflatex >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: pdflatex not found in PATH
    echo Skipping local compilation, will rely on GitHub Actions
    goto push
)

:: Compile cover
echo Compiling cover...
pdflatex -interaction=nonstopmode cover.tex
pdflatex -interaction=nonstopmode cover.tex
if exist cover.pdf (
    mkdir pdfs 2>nul
    copy cover.pdf pdfs\cover.pdf >nul
    echo ✓ Cover compiled
) else (
    echo ✗ Cover compilation failed
)

:: Compile main document
echo Compiling main document...
pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
if exist main.pdf (
    copy main.pdf pdfs\codex.pdf >nul
    echo ✓ Main document compiled
) else (
    echo ✗ Main document compilation failed
)

:: Clean up auxiliary files
echo Cleaning up...
del *.aux *.log *.out *.toc *.lof *.lot 2>nul

:push
:: Use the authentication script to push to GitHub
echo Pushing to GitHub...
call "%USERPROFILE%\Documents\letta-memory-system\push-with-token.bat" "%~dp0"

echo ===== Process Complete =====
echo.
echo Your Codex has been compiled and pushed to GitHub!
echo GitHub Pages will update automatically in a few minutes.
echo View your site at: https://MikaelTHEoret.github.io/Codex/
echo.
pause