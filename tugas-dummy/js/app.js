$(document).on("click", ".btn-kategori" ,function () {
    let filter = $(this).attr("value");
    showData(filter);
});

$(document).on("click", "#btn-update" ,function () {
    let id = $(this).attr("data-id");
    let title = $(this).attr("title");
    let description = $(this).attr("description");
    let category = $(this).attr("category");
    $("#titel").html("Ubah Data");
    form();
    updateData(id,title,description,category);
    
});

$(document).on("click", "#btn-delete" ,function () {
    let id = $(this).attr("data-id");
    if (confirm("Yakin Akan Menghapusnya ?")) {
        Delete(id); 
    }
});

$(document).on("click", "#btn-info" ,function () {
    let id = $(this).attr("data-id");
    info(id);
});

$("#btn-tambah").click(function (e) { 
    e.preventDefault();
    form();
});

$("#submit").click(function (e) { 
    e.preventDefault();
    id = $("#id").val();
    title = $("#title").val();
    description = $("#description").val();
    category = $("#kategori").val();

    if (id == "") {
        insert();
    } else {
        update();
    }
    
});


function selectData (){
    let Url = "https://dummyjson.com/products";
    $.ajax({
        type: "get",
        url: Url,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response);
            let out;
            let no=1;
            $.each(response.products, function (key, val) { 
                 out += `<tr>
                        <td>${no++}</td>
                        <td>${val.title}</td>
                        <td>${val.description}</td>
                        <td><button type="button" id="btn-update" class="btn btn-warning" style="color: white;" data-bs-toggle="modal"
                         data-bs-target="#exampleModal" data-id="${val.id}" title="${val.title}" description="${val.description}"
                          category="${val.category}">Update</button></td>
                        <td><button type="button" id="btn-delete" class="btn btn-danger" data-id="${val.id}">Delete</button></td>
                 </tr>`
            });
            $("#isidata").html(out);
        }
    }); 
    Kategori(); 
}


function Kategori() {
    let Url = "https://dummyjson.com/products/categories";
    $.ajax({
        type: "get",
        url: Url,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response);
            
            let out = "";
            $.each(response, function (key, val) { 
              
                out += `<li class="nav-item"><button class="btn btn-dark btn-kategori m-2" value=${val}>${val}</button></li>`
            }); 
                     
            $("#menu").html(out);
        }
    });
    showData();
}

function showData(filter) {
    $.ajax({
        type: "get",
        url: "https://dummyjson.com/products/category/" + filter,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response);
            let no =1;
           
            let out;
            $.each(response.products, function (key, val) { 
                out += `<tr>
                       <td>${no++}</td>
                       <td>${val.title}</td>
                       <td>${val.description}</td>
                       <td><button type="button" id="btn-info" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id:"${val}">Info</button></td>
                       <td><button type="button" id="btn-update" class="btn btn-warning" style="color: white;" data-bs-toggle="modal"
                       data-bs-target="#exampleModal" data-id="${val.id}" title="${val.title}" description="${val.description}"
                        category="${val.category}">Update</button></td>
                      <td><button type="button" id="btn-delete" class="btn btn-danger" data-id="${val.id}">Delete</button></td>
                </tr>`
           });

           $("#isidata").html(out);
        }
    });
    
}


function form() {
    let Url = "https://dummyjson.com/products/categories";
    $.ajax({
        type: "get",
        url: Url,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response);
            let out = '<option selected>----------</option>';
            $.each(response, function (key, val) { 
                 out += `
                     <option value=${val}>${val}</option>`
    
            });          
            $("#kategori").html(out);
        }
    });
}

function insert() {
    let Url = "https://dummyjson.com/products/add"
    let data = {
        title: title,
        description: description,
        category: category
    };
    fetch(
        Url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: data['title'],
            description: data['descrition'],
            category: data['category'] 
        })
    })
        .then(res => res.json())
        .then(console.log(data))
        .then(alert(data['title'] + " insert"))
    
}

function updateData(id,title,description,category) {
    // let Url = "https://dummyjson.com/products/";
    let idData = {
        id : id,
        title : title,
        description : description,
        category : category
    } 
    fetch(
        'https://dummyjson.com/products/' + id,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
            id : $("#id").val(idData.id),
            title : $("#title").val(idData.title),
            description : $("#description").val(idData.description),
            category : $("#kategori").val(idData.category)
        })  
    })
    .then(res => res.json())
    .then(console.log(idData))
}

function update() {
    let data = {
        title : title,
        description : description,
        category : category
    }
    fetch(
        'https://dummyjson.com/products/' + id,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: data["title"],
            description : data["description"],
            category : data['category']
          })
    })
    .then(res => res.json())
    .then(console.log(data))
    .then(alert(data['title'] + " Update"))
}

function Delete(id) {
    fetch(
        'https://dummyjson.com/products/' + id,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log(id))
    .then(alert(id + " Delete"))
}




selectData();
