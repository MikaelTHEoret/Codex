@echo off
:: push-codex-with-token.bat - Push the Codex of Harmonic Unity to GitHub with explicit token 

echo ===== Pushing Codex of Harmonic Unity to GitHub ===== 

:: Get GitHub token from Letta Memory System
echo Getting GitHub token from Letta Memory System...  
cd /d C:\Users\Mik\Documents\letta-memory-system  
for /f "tokens=*" %%a in ('node extract-github-token.js') do set GITHUB_TOKEN=%%a 
echo ✓ GitHub token obtained  

:: Return to original directory
cd /d %~dp0

:: Add all changes
git add .

:: Commit changes
git commit -m "Update Codex of Harmonic Unity"

:: Push with explicit token authentication
git push https://MikaelTHEoret:%GITHUB_TOKEN%@github.com/MikaelTHEoret/Codex.git main

echo.
echo ===================================
echo ✅ Files pushed to GitHub successfully!
echo.
echo Your Codex of Harmonic Unity has been pushed to GitHub.
echo The GitHub Pages site will update automatically in a few minutes.
echo.
echo Visit: https://MikaelTHEoret.github.io/Codex/
echo ===================================

pause
