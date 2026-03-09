
// API URL


const API_ALL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const API_SINGLE = "https://phi-lab-server.vercel.app/api/v1/lab/issue/";
const API_SEARCH = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";


// DOM ELEMENTS


const issuesContainer = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");

const tabAll = document.getElementById("tabAll");
const tabOpen = document.getElementById("tabOpen");
const tabClosed = document.getElementById("tabClosed");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const spinner = document.getElementById("loadingSpinner");

// MODAL
const modal = document.getElementById("issueModal");
const closeModal1 = document.getElementById("closeModal1");
const closeModal2 = document.getElementById("closeModal2");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const modalLabel = document.getElementById("modalLabel");
const modalCreated = document.getElementById("modalCreated");
const modalIssueId = document.getElementById("modalIssueId");
const modalBorder = document.getElementById("modalBorder");


// LOADING SPINNER

function showSpinner() {
    spinner.classList.remove("hidden");
}

function hideSpinner() {
    spinner.classList.add("hidden");
}


// FETCH ALL ISSUES


async function loadIssues() {
    showSpinner();
    const res = await fetch(API_ALL);
    const data = await res.json();
    hideSpinner();
    displayIssues(data.data);
}


// DISPLAY ISSUES


function displayIssues(issues) {

    issuesContainer.innerHTML = "";
    issueCount.innerText = issues.length;

    issues.forEach(issue => {

        const card = document.createElement("div");

        // Border color based on status
        const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500";

        // Dynamic priority badge color
        let priorityColor = "";
        if (issue.priority.toLowerCase() === "high") {
            priorityColor = "bg-red-100 text-red-500";
        } else if (issue.priority.toLowerCase() === "medium") {
            priorityColor = "bg-yellow-100 text-yellow-600";
        } else {
            priorityColor = "bg-gray-100 text-gray-700";
        }

        card.className = `
    bg-white rounded-xl shadow cursor-pointer overflow-hidden border-t-4 ${borderColor}
    flex flex-col justify-between h-full
`;

        card.innerHTML = `
<div class="p-5">
    <div class="flex justify-between items-center mb-4">
        <div class=" p-3 rounded-full text-green-600">
            <i class="fa-regular fa-circle-dot"></i>
        </div>

        <span class="${priorityColor} px-4 py-1 rounded-full text-sm font-semibold">
            ${issue.priority}
        </span>
    </div>

    <h3 class="text-xl font-bold text-gray-800 mb-2">
        ${issue.title}
    </h3>

    <p class="text-gray-500 mb-4">
        ${issue.description.slice(0, 80)}...
    </p>

    <div class="flex gap-3 mb-4">
        ${issue.labels && issue.labels.length > 0 ? issue.labels.map(label => `
            <span class=" bg-yellow-500 px-3 py-1 rounded-full text-sm">
                ${label}
            </span>
        `).join('') : ''}
    </div>
</div>

<div class="bg-gray-100 px-5 py-3 flex justify-between text-gray-500 text-sm">
    <!-- Author + Created -->
    <div class="flex flex-col gap-2">
        <div>#${issue.id} by ${issue.author}</div>
        <div>Assignee: ${issue.assignee || "Unassigned"}</div>
    </div>

    <!-- Assignee + Updated -->
    <div class="flex flex-col text-right gap-2">
        <div>${new Date(issue.createdAt).toLocaleDateString()}</div>
        <div>Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</div>
    </div>
</div>
`;

        card.addEventListener("click", () => loadSingleIssue(issue.id));

        issuesContainer.appendChild(card);

    });

}


// TAB TOGGLE FUNCTION


function setActiveTab(activeTab) {
    const tabs = [tabAll, tabOpen, tabClosed];
    tabs.forEach(tab => {
        tab.classList.remove("bg-purple-600", "text-white");
        tab.classList.add("bg-gray-100", "text-gray-700");
    });
    activeTab.classList.add("bg-purple-600", "text-white");
    activeTab.classList.remove("bg-gray-100", "text-gray-700");
}


// FILTER ISSUES


async function filterIssues(status) {
    showSpinner();
    const res = await fetch(API_ALL);
    const data = await res.json();
    hideSpinner();

    if (status === "all") {
        displayIssues(data.data);
    } else {
        const filtered = data.data.filter(issue => issue.status === status);
        displayIssues(filtered);
    }
}


// SEARCH ISSUES


async function searchIssues() {
    const text = searchInput.value.trim();
    if (!text) {
        loadIssues();
        return;
    }

    showSpinner();
    const res = await fetch(API_SEARCH + text);
    const data = await res.json();
    hideSpinner();

    displayIssues(data.data);
}


// SINGLE ISSUE (MODAL)


async function loadSingleIssue(id) {
    showSpinner();
    const res = await fetch(API_SINGLE + id);
    const data = await res.json();
    hideSpinner();

    const issue = data.data;

    // Status
    modalStatus.innerHTML = `
        <span class="${issue.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'} px-3 py-1 rounded-full text-sm font-semibold">
            ${issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
        </span>
    `;

    // Title & Date
    modalTitle.innerText = issue.title;
    modalCreated.innerText = new Date(issue.createdAt).toLocaleDateString();

    // Labels
    modalLabel.innerHTML = issue.labels && issue.labels.length > 0 ? 
        issue.labels.map(label => `
            <span class="border border-red-300 text-red-500 px-3 py-1 rounded-full text-sm">
                ${label}
            </span>
        `).join('') : '';

    // Description
    modalDescription.innerText = issue.description;

    // author
    modalAuthor.innerText = issue.author;

    // Priority
    let priorityColor = '';
    if (issue.priority.toLowerCase() === "high") priorityColor = "bg-red-500 text-white";
    else if (issue.priority.toLowerCase() === "medium") priorityColor = "bg-yellow-400 text-white";
    else priorityColor = "bg-gray-400 text-white";

    modalPriority.innerHTML = `
        <span class="px-4 py-1 rounded-full text-sm font-semibold ${priorityColor}">
            ${issue.priority.toUpperCase()}
        </span>
    `;

    modal.classList.remove("hidden");
}


// CLOSE MODAL


closeModal1.addEventListener("click", () => {
    modal.classList.add("hidden");
});
closeModal2.addEventListener("click", () => {
    modal.classList.add("hidden");
});


// TAB EVENTS


tabAll.addEventListener("click", () => {
    setActiveTab(tabAll);
    filterIssues("all");
});

tabOpen.addEventListener("click", () => {
    setActiveTab(tabOpen);
    filterIssues("open");
});

tabClosed.addEventListener("click", () => {
    setActiveTab(tabClosed);
    filterIssues("closed");
});


// SEARCH BUTTON


searchBtn.addEventListener("click", searchIssues);


// ENTER KEY SEARCH


searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchIssues();
});


// INITIAL LOAD


loadIssues();