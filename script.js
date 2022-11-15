const body = document.querySelector("body");
const header = document.querySelector("header");
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const themeButton = document.querySelector(".theme-button");
const unOrderList = document.querySelector("ul");
const taskContainer = document.querySelector(".task-container");
const activityTrackPanel = document.querySelector(".activity-track-panel");
const taskInputPanel = document.querySelector(".task-input-panel");
const activityTrackBtn = document.querySelectorAll(".activity-track-btn");
const userTaskInput = document.querySelector("input");
const taskCompleteBtn = document.querySelector(".complete-button-holder");
const taskCompleteIcon = document.querySelector(".complete-button");
const listDiscription = document.querySelector(".empty-task-discp");
const enterOrAddTaskButton = document.querySelector(".enter-button-holder");
const allTasksPanelBtn = document.querySelector(".show-all-panel");
const activeTasksPanelBtn = document.querySelector(".show-active-panel");
const completedTasksPanelBtn = document.querySelector(".show-completed-panel");
const allListItems = [];
const activeListItems = [];
const completedListItems = [];

let isComplete = false;
let currentPanel = "all";
buttonColourHighlight(
  allTasksPanelBtn,
  activeTasksPanelBtn,
  completedTasksPanelBtn
);

function changeBGTheme() {
  sunIcon.classList.toggle("hidden");
  moonIcon.classList.toggle("visible");
  body.classList.toggle("bg-light-theme");
  unOrderList.classList.toggle("bg-light-theme");
  header.classList.toggle("header-light-wallpaper");
  taskContainer.classList.toggle("bg-light-theme");
  activityTrackPanel.classList.toggle("bg-light-theme");
  taskInputPanel.classList.toggle("bg-light-theme");
  activityTrackBtn[0].classList.toggle("btn-light-theme");
  activityTrackBtn[1].classList.toggle("btn-light-theme");
  activityTrackBtn[2].classList.toggle("btn-light-theme");
  userTaskInput.classList.toggle("bg-light-theme");
}

function taskCompleteToggle() {
  taskCompleteIcon.classList.toggle("visible");
  isComplete = !isComplete;
}

function listDiscriptionHandler() {
  if (currentPanel === "all") {
    if (allListItems.length === 0) {
      listDiscription.classList.remove("hidden");
    } else {
      listDiscription.classList.add("hidden");
    }
  }else if (currentPanel === "active") {
    if (activeListItems.length === 0) {
      listDiscription.classList.remove("hidden");
    }else {
      listDiscription.classList.add("hidden");
    }
  }else if (currentPanel === "completed") {
    if (completedListItems.length === 0) {
      listDiscription.classList.remove("hidden");
    }else {
      listDiscription.classList.add("hidden");
    }
  }
}

function clearUserInput() {
  userTaskInput.value = "";
  taskCompleteIcon.classList.remove("visible");
  isComplete = false;
}

function createTaskLi(taskText, taskStatus, taskId) {
  const id = taskId;
  const newTaskLi = document.createElement("li");
  newTaskLi.id = id;
  const taskTitle = document.createElement("h3");
  const taskStatusIconHolder = document.createElement("span");
  const taskStatusIcon = document.createElement("span");
  const deleteBtn = document.createElement("button");
  newTaskLi.className = "user-task-element";
  taskTitle.className = "InputInListItem";
  taskTitle.innerHTML = `${taskText}`;
  taskStatusIconHolder.className = "complete-button-holder";
  taskStatusIcon.className = "hidden";
  taskStatusIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><linearGradient xmlns="http://www.w3.org/2000/svg" id="linear-gradient" gradientUnits="userSpaceOnUse" x1="-1.28" x2="19.382" y1="26.729" y2="3.812"><stop offset="0" stop-color="#119990"></stop><stop offset="1" stop-color="#EE82EE"></stop></linearGradient><path xmlns="http://www.w3.org/2000/svg" d="m12 1a11 11 0 1 0 11 11 11.013 11.013 0 0 0 -11-11zm4.707 9.207-5 5a1 1 0 0 1 -1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 4.293-4.293a1 1 0 0 1 1.414 1.414z" fill="url(#linear-gradient)" data-original="url(#linear-gradient)" class=""></path></g></svg>`;
  if (taskStatus) {
    taskStatusIcon.classList.remove("hidden");
    taskTitle.classList.add("highlight");
  } else {
    taskStatusIcon.classList.add("hidden");
    taskTitle.classList.remove("highlight");
  }

  deleteBtn.innerHTML = `<span">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"   viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><linearGradient xmlns="http://www.w3.org/2000/svg" id="linear-gradient" gradientUnits="userSpaceOnUse" x1="1" x2="31" y1="16" y2="16"><stop offset="0" stop-color="#119990"></stop><stop offset="1" stop-color="#EE82EE"></stop></linearGradient><g xmlns="http://www.w3.org/2000/svg" id="Layer_3" data-name="Layer 3"><path d="m16 1a15 15 0 1 0 15 15 15.017 15.017 0 0 0 -15-15zm5.707 19.293a1 1 0 1 1 -1.414 1.414l-4.293-4.293-4.293 4.293a1 1 0 0 1 -1.414-1.414l4.293-4.293-4.293-4.293a1 1 0 0 1 1.414-1.414l4.293 4.293 4.293-4.293a1 1 0 0 1 1.414 1.414l-4.293 4.293z" fill="url(#linear-gradient)" data-original="url(#linear-gradient)" class=""></path></g></g></svg>
    </span>`;

  unOrderList.prepend(newTaskLi);
  newTaskLi.append(taskTitle);
  newTaskLi.append(deleteBtn);
  newTaskLi.prepend(taskStatusIconHolder);
  taskStatusIconHolder.append(taskStatusIcon);

  taskStatusIconHolder.addEventListener("click", (e) => {
    taskStatusIcon.classList.toggle("hidden");
    const toggledElement = allListItems.find((element) => {
      return element.id === id;
    });
    const indexOfActiveListItem = activeListItems.indexOf(toggledElement);
    const indexOfCompletedListItem = completedListItems.indexOf(toggledElement);
    if (toggledElement.status) {
      activeListItems.splice(0,0,toggledElement);
      completedListItems.splice(indexOfCompletedListItem, 1);
      toggledElement.status = false;
    } else {
      completedListItems.splice(0,0,toggledElement);
      activeListItems.splice(indexOfActiveListItem, 1);
      toggledElement.status = true;
    }
    let currentList = e.target.closest("li");
    if (currentPanel !== "all") {
      currentList.classList.add("hidden");
    }
    listDiscriptionHandler();
  });

  deleteBtn.addEventListener("click", () => {
    const indexOfToggledElement = allListItems.findIndex((element) => {
      return element.id === id;
    });
    if (taskStatus) {
      completedListItems.splice(indexOfToggledElement, 1);
    } else {
      activeListItems.splice(indexOfToggledElement, 1);
    }
    allListItems.splice(indexOfToggledElement, 1);
    newTaskLi.remove();
    listDiscriptionHandler();
  });
}

function userInputTaskUpdateHandler() {
  if (userTaskInput.value !== "") {
    allListItems.push({
      value: userTaskInput.value,
      status: isComplete,
      id: new Date().toISOString(),
    });
    if (allListItems[allListItems.length - 1].status) {
      completedListItems.push({
        value: userTaskInput.value,
        status: isComplete,
        id: new Date().toISOString(),
      });
    } else {
      activeListItems.push({
        value: userTaskInput.value,
        status: isComplete,
        id: new Date().toISOString(),
      });
    }
    switch (currentPanel) {
      case "all":
        allPanelOutput();
        break;
      case "active":
        activePanelOutput();
        break;
      case "completed":
        completedPanelOutput();
        break;
      default:
        allPanelOutput();
    }
    listDiscriptionHandler();
    clearUserInput();
  }
}

function buttonColourHighlight(currentBtnName, sideBtn, sideBtn2) {
  currentBtnName.style.color = "#24a0ed";
  sideBtn.style.color = "grey";
  sideBtn2.style.color = "grey";
}

function allPanel() {
  if (currentPanel !== "all") {
    buttonColourHighlight(
      allTasksPanelBtn,
      activeTasksPanelBtn,
      completedTasksPanelBtn
    );
    allPanelOutput();
  }
}

function allPanelOutput() {
  unOrderList.replaceChildren();
  allListItems.forEach((listItem) => {
    createTaskLi(listItem.value, listItem.status, listItem.id);
  });
  currentPanel = "all";
  listDiscriptionHandler();
}

function activePanel() {
  if (currentPanel !== "active") {
    buttonColourHighlight(
      activeTasksPanelBtn,
      allTasksPanelBtn,
      completedTasksPanelBtn
    );
    activePanelOutput();
  }
}

function activePanelOutput() {
  unOrderList.replaceChildren();
  activeListItems.forEach((listItem) => {
    createTaskLi(listItem.value, listItem.status, listItem.id);
  });
  currentPanel = "active";
  listDiscriptionHandler();
}

function completedPanel() {
  if (currentPanel !== "completed") {
    buttonColourHighlight(
      completedTasksPanelBtn,
      allTasksPanelBtn,
      activeTasksPanelBtn
    );
    completedPanelOutput();
  }
}

function completedPanelOutput() {
  unOrderList.replaceChildren();
  completedListItems.forEach((listItem) => {
    createTaskLi(listItem.value, listItem.status, listItem.id);
  });
  currentPanel = "completed";
  listDiscriptionHandler();
}

function inputTaskWithEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    userInputTaskUpdateHandler();
  }
}

themeButton.addEventListener("click", changeBGTheme);
taskCompleteBtn.addEventListener("click", taskCompleteToggle);
enterOrAddTaskButton.addEventListener("click", userInputTaskUpdateHandler);
userTaskInput.addEventListener("keydown", inputTaskWithEnterKey);
allTasksPanelBtn.addEventListener("click", allPanel);
activeTasksPanelBtn.addEventListener("click", activePanel);
completedTasksPanelBtn.addEventListener("click", completedPanel);
