let form = document.querySelector(".todo-form"),
  input = document.querySelector(".add-input"),
  toDoList = document.querySelector(".todo-list"),
  todoArr = JSON.parse(localStorage.getItem("item")) || [],
  toDoId ;
  if(localStorage.getItem("item") && todoArr.length > 0){
    
      toDoId= todoArr[todoArr.length-1].id + 1
  }
  else{
    toDoId = 0
  }
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value != "") {
    todoArr.push({ id:toDoId++,desc: input.value, checked: false});
    input.value = "";
    localStorage.setItem("item", JSON.stringify(todoArr));
    toDoList.innerHTML += `
    <li class="list-item ${
      todoArr[todoArr.length - 1].checked ? "checked" : ""
    } " data-id=${todoArr[todoArr.length-1].id}>
      <div>
        <span class="checked-item"><i class="fa-solid fa-check"></i></span>
        <span class="item-description">${
          todoArr[todoArr.length - 1].desc
        }</span>
      </div>
      <span class="remove-item" data-id=${todoArr[todoArr.length-1].id} ><i class="fa-solid fa-xmark"></i></span>
    </li>
    `;
    checked()
    removeTodo()
  }
});

if (localStorage.getItem("item")) {
  // todoArr = JSON.parse(localStorage.getItem("item"));
  todoArr.forEach((e) => {
    toDoList.innerHTML += `
      <li class="list-item ${e.checked ? "checked" : ""} " data-id=${e.id}>
      <div>
        <span class="checked-item"><i class="fa-solid fa-check"></i></span>
        <span class="item-description">${e.desc}</span>
      </div>
      <span class="remove-item" data-id=${e.id}><i class="fa-solid fa-xmark"></i></span>
      </li>
        `;
  });
  checked()
  removeTodo()
}
function checked(){
  let checkedItem = document.querySelectorAll(".list-item")
  checkedItem.forEach((item)=>{
    item.addEventListener("click",function(){
      todoArr = JSON.parse(localStorage.getItem("item"));
      let findId=item.getAttribute("data-id")
      let todoIndex=todoArr.indexOf(todoArr.find(t=>t.id===parseInt(findId)))
      let findTodo=todoArr[todoIndex]
      findTodo.checked = !findTodo.checked
      localStorage.setItem("item",JSON.stringify(todoArr))
      item.classList.toggle("checked")
    })
  })
}
function removeTodo(){
  let removeItem = document.querySelectorAll(".remove-item")
  removeItem.forEach((item)=>{
    item.addEventListener("click",function(e){
      let findId=item.getAttribute("data-id")
      todoArr = JSON.parse(localStorage.getItem("item"));
      let todoIndex=todoArr.indexOf(todoArr.find(t=>t.id===parseInt(findId)))
      todoArr.splice(todoIndex,1)
      item.parentElement.remove()
      localStorage.setItem("item",JSON.stringify(todoArr))
      e.stopPropagation()
    })
  })
}

let modeIcon = document.querySelector(".mode-icon");
modeIcon.addEventListener("click", function () {
  document.body.classList.toggle("darkmode");
  let mode = localStorage.getItem("mode");
  if (mode === "true") {
    localStorage.setItem("mode", false);
    modeIcon.innerHTML= `<i class="fa-solid fa-moon"></i>`
    
  } else {
    localStorage.setItem("mode", true);
    modeIcon.innerHTML =`<i class="fa-solid fa-sun"></i>`
  }
});
if (localStorage.getItem("mode") === "true") {
  document.body.classList.add("darkmode");
  modeIcon.innerHTML =`<i class="fa-solid fa-sun"></i>`
} else {
  document.body.classList.remove("darkmode");
  modeIcon.innerHTML= `<i class="fa-solid fa-moon"></i>`
}









