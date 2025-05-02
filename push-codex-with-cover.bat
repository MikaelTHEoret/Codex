@echo off  
:: push-codex-with-cover.bat - Push the Codex of Harmonic Unity to GitHub  
  
echo ===== Pushing Codex of Harmonic Unity to GitHub ===== 
echo Getting GitHub token from Letta Memory System...  
cd /d C:\Users\Mik\Documents\letta-memory-system  
for /f "tokens=*" %%a in ('node extract-github-token.js') do set GITHUB_TOKEN=%%a 
echo V GitHub token obtained  
cd /d %~dp0  
git add .  
git commit -m "Update Codex of Harmonic Unity"  
git push 
