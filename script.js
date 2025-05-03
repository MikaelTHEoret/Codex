document.addEventListener('DOMContentLoaded', function() {
  // Set last updated date
  const lastUpdated = document.getElementById('last-updated');
  if (lastUpdated) {
    lastUpdated.textContent = new Date().toLocaleDateString();
  }
  
  // Chapter list container
  const chapterList = document.getElementById('chapter-list');
  
  // Function to add a chapter item
  function addChapterItem(title, path, description = '') {
    if (!chapterList) return;
    
    const chapterItem = document.createElement('div');
    chapterItem.className = 'chapter-item';
    
    const heading = document.createElement('h3');
    heading.textContent = title;
    
    let content = '';
    if (description) {
      const desc = document.createElement('p');
      desc.textContent = description;
      content = desc;
    }
    
    const actions = document.createElement('div');
    actions.className = 'actions';
    
    const viewButton = document.createElement('a');
    viewButton.href = path;
    viewButton.className = 'button';
    viewButton.innerHTML = '<i class="fas fa-eye"></i> View';
    viewButton.setAttribute('target', '_blank');
    
    const downloadButton = document.createElement('a');
    downloadButton.href = path;
    downloadButton.className = 'button';
    downloadButton.innerHTML = '<i class="fas fa-download"></i> Download';
    downloadButton.setAttribute('download', '');
    
    actions.appendChild(viewButton);
    actions.appendChild(downloadButton);
    
    chapterItem.appendChild(heading);
    if (content) {
      chapterItem.appendChild(content);
    }
    chapterItem.appendChild(actions);
    
    chapterList.appendChild(chapterItem);
    
    return chapterItem;
  }
  
  // Function to create a directory group
  function createDirectoryGroup(title) {
    if (!chapterList) return;
    
    const group = document.createElement('div');
    group.className = 'directory-group';
    
    const heading = document.createElement('h3');
    heading.textContent = title;
    
    group.appendChild(heading);
    chapterList.appendChild(group);
    
    return group;
  }
  
  // Add cover first with description
  if (chapterList) {
    addChapterItem(
      'Cover Page - The Codex of Harmonic Unity', 
      'pdfs/cover.pdf',
      'The illustrated cover of the Codex of Harmonic Unity, featuring sacred geometry and golden ratio proportions.'
    );
  
    // Add primary sections group
    const primaryGroup = createDirectoryGroup('Primary Sections');
  
    // Add chapter descriptions
    const chapterDescriptions = {
      'Foundations of Knowledge': 'Exploration of epistemology, types of knowledge, and fundamental structures of understanding.',
      'The Scientific Method': 'Analysis of the systematic approach to empirical investigation and knowledge acquisition.',
      'Harmonic Principles': 'Introduction to the mathematics of resonance, wave patterns, and vibrational systems.',
      'Metaphysical Frameworks': 'Examination of ontological structures and the nature of reality through vibrational lenses.',
      'Triadic Systems': 'Study of three-fold structures and their manifestation across various domains of knowledge.'
    };
  
    // Add main codex with description
    const mainCodex = addChapterItem(
      'Complete Codex', 
      'pdfs/codex.pdf',
      'The full compilation of all sections of the Codex of Harmonic Unity in a single document.'
    );
    if (primaryGroup && mainCodex) primaryGroup.appendChild(mainCodex);
  
    // Add chapters to primary group
    for (const [title, description] of Object.entries(chapterDescriptions)) {
      const filename = title.toLowerCase().replace(/\s+/g, '_');
      const chapterItem = addChapterItem(
        title, 
        `pdfs/chapters/${filename}.pdf`, 
        description
      );
      if (primaryGroup && chapterItem) primaryGroup.appendChild(chapterItem);
    }
  
    // Advanced topics group
    const advancedGroup = createDirectoryGroup('Advanced Topics');
  
    // Add advanced topics
    const advancedTopics = {
      'Quantum Resonance': 'Exploration of quantum mechanics through the lens of harmonic systems and wave functions.',
      'Sacred Geometry': 'Study of geometric patterns and ratios found in natural and constructed sacred spaces.',
      'Consciousness as Vibration': 'Analysis of consciousness as emergent patterns of resonant information exchange.'
    };
  
    for (const [title, description] of Object.entries(advancedTopics)) {
      const filename = title.toLowerCase().replace(/\s+/g, '_');
      const chapterItem = addChapterItem(
        title, 
        `pdfs/chapters/${filename}.pdf`, 
        description
      );
      if (advancedGroup && chapterItem) advancedGroup.appendChild(chapterItem);
    }
  }
  
  // Function to check if PDFs exist
  function checkPdfExistence() {
    const links = document.querySelectorAll('a[href$=".pdf"]');
    links.forEach(link => {
      fetch(link.href, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            // If PDF doesn't exist, add a placeholder class
            if (link.closest('.chapter-item')) {
              link.closest('.chapter-item').classList.add('placeholder');
              
              // Add a note to the chapter item
              const note = document.createElement('p');
              note.className = 'placeholder-note';
              note.textContent = 'This chapter is under development and will be available soon.';
              link.closest('.chapter-item').appendChild(note);
              
              // Update buttons
              const buttons = link.closest('.chapter-item').querySelectorAll('.button');
              buttons.forEach(button => {
                button.classList.add('disabled');
                button.addEventListener('click', function(e) {
                  e.preventDefault();
                  alert('This chapter is currently under development and will be available soon.');
                });
              });
            }
          }
        })
        .catch(error => {
          console.warn(`Error checking PDF existence: ${error}`);
        });
    });
  }
  
  // Run the check
  checkPdfExistence();
  
  // Add animated decorative elements
  const addDecorations = () => {
    // Add some decorative dividers
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (index < sections.length - 1) {
        const divider = document.createElement('div');
        divider.className = 'decorative-line';
        section.parentNode.insertBefore(divider, section.nextSibling);
      }
    });
  };
  
  // Add decorations after a short delay
  setTimeout(addDecorations, 500);
});