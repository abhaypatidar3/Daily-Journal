const loadEntries = () => {
    const entriesContainer = document.getElementById("journal-entries");
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    savedEntries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";
      entryDiv.id = entry.id;
      entryDiv.innerHTML = `
        <h3>${new Date(entry.date).toDateString()}</h3>
        <p>${entry.content}</p>
        <button class="delete-btn" onclick="deleteEntry('${entry.id}')">Delete</button>
      `;
      entriesContainer.appendChild(entryDiv);
    });
  };

  const saveEntry = () => {
    const dateInput = document.getElementById("journal-date").value;
    const contentInput = document.getElementById("journal-content").value;

    if (!dateInput || !contentInput.trim()) {
      alert("Please fill out both fields before saving.");
      return;
    }

    const entry = {
      id: `entry-${Date.now()}`,
      date: dateInput,
      content: contentInput,
    };

    // Save to localStorage
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    savedEntries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(savedEntries));

    // Add the entry to the page
    const entriesContainer = document.getElementById("journal-entries");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";
    entryDiv.id = entry.id;
    entryDiv.innerHTML = `
      <h3>${new Date(entry.date).toDateString()}</h3>
      <p>${entry.content}</p>
      <button class="delete-btn" onclick="deleteEntry('${entry.id}')">Delete</button>
    `;
    entriesContainer.appendChild(entryDiv);

    // Clear inputs
    document.getElementById("journal-date").value = "";
    document.getElementById("journal-content").value = "";

    alert("Journal entry saved!");
  };

  const deleteEntry = (id) => {
    const entryToDelete = document.getElementById(id);
    if (entryToDelete) {
      entryToDelete.remove();

      // Remove from localStorage
      const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      const updatedEntries = savedEntries.filter((entry) => entry.id !== id);
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

      alert("Journal entry deleted!");
    }
  };

  // Load entries on page load
  window.onload = loadEntries;