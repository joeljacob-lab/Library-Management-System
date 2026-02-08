const books_library=[];

function Books(title,author,pages,read){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    if(read==="read"){
        this.read="read";
    }
    else{
        this.read="not_read";
    }
}

function addToLibrary(title,author,pages,read){
    const book=new Books(title,author,pages,read);
    books_library.push(book)
}

function display(){
    const table=document.getElementById("tableBody")
    table.innerHTML=""

    books_library.forEach(book => {
        const row=document.createElement("tr")

        row.dataset.id=book.id.slice(0,6)
        row.innerHTML=`<td>${book.id.slice(0,6)}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td class="read">${book.read}</td>

        <td>
            <button class="toggleBtn">Toggle Read</button>
            <button class="removeBtn">Remove</button>
        </td>
        `
        table.appendChild(row)

    }
    )
    removeButton();
    toggleButton();
}


function removeButton(){
    const removebuttons=document.querySelectorAll(".removeBtn")

    removebuttons.forEach(button=>{
        button.addEventListener("click",()=>{
            const row=button.parentElement.parentElement;
            const id=row.dataset.id
        
        for(i=0;i<books_library.length;i++){
            if(books_library[i].id.slice(0,6)===id){
                books_library.splice(i,1)
            }
        }
        row.remove()
    })
    })
}


function toggleButton(){
    const togglebuttons=document.querySelectorAll(".toggleBtn")

    togglebuttons.forEach(button=>{
        button.addEventListener("click",()=>{
            const row=button.parentElement.parentElement;
            const id=row.dataset.id

            for(let i=0;i<books_library.length;i++){
                if(books_library[i].id.slice(0,6)===id){
                    if(books_library[i].read==="read"){
                        books_library[i].read="not_read"
                    }
                    else{
                        books_library[i].read="read"
                    }
                row.querySelector(".read").textContent=books_library[i].read    
                }
            }
        })
    })
}

function submit_button(){
    const form=document.querySelector("form");

    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        const title=document.getElementById("title").value;
        const author=document.getElementById("author").value;
        const pages=document.getElementById("pages").value;
        const read=document.getElementById("read").value;

        if(title==="" || author==="" || pages==="" || read===""){
            alert("Fill out all the fields")
        }

        if(title!="" && author!="" && pages!="" && read!=""){
           addToLibrary(title,author,pages,read)
            display(); 
        }
    })
}

submit_button();