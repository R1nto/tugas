// Produk
$("#btn-barang").click(function (e) { 
    e.preventDefault();
    selectData();
});

$(document).on("click", ".btn-kategori" ,function () {
    let filter = $(this).attr("value");
    showData(filter);
});

$(document).on("click", "#btn-update" ,function () {
    let id = $(this).attr("data-id");
    $("#titel").html("Ubah Data");
    form();
    updateData(id);
});

$(document).on("click", "#btn-delete" ,function () {
    let id = $(this).attr("data-id");
    if (confirm("Yakin Akan Menghapusnya ?")) {
        Delete(id); 
    }
});

$(document).on("click", ".btn-tambah" ,function () {
    $("#titel").html("Tambah Data");
    $("#id").val();
    $("#ti").val();
    $("#description").val();
    $("#kategori").val();

    form();  
});

$("#submit").click(function (e) { 
    e.preventDefault();
    id = $("#id").val();
    title = $("#ti").val();
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
            let out = '<div class="row mt-5"> <h2 id="title">Data Dummy</h2> <button type="button" class="btn btn-primary btn-tambah" data-bs-toggle="modal" data-bs-target="#exampleModal"> Tambah Barang </button> </div> <table class="table" > <thead> <tr> <th scope="col">No</th> <th scope="col">Title</th> <th scope="col">Description</th><th scope="col">Update</th><th scope="col">Delete</th></tr></thead> <tbody>';
            let no=1;
            $.each(response.products, function (key, val) { 
                 out += `<tr>
                        <td>${no++}</td>
                        <td>${val.title}</td>
                        <td>${val.description}</td>
                        <td><button type="button" id="btn-update" class="btn btn-warning" style="color: white;" data-bs-toggle="modal"
                         data-bs-target="#exampleModal" data-id="${val.id}">Update</button></td>
                        <td><button type="button" id="btn-delete" class="btn btn-danger" data-id="${val.id}">Delete</button></td>
                 </tr>`
            });
            out += '</tbody>  </table>'
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
           
            let out = '<table class="table" > <thead> <tr> <th scope="col">No</th> <th scope="col">Title</th> <th scope="col">Description</th><th scope="col">Update</th><th scope="col">Delete</th></tr></thead> <tbody>';
            $.each(response.products, function (key, val) { 
                out += `<tr>
                       <td>${no++}</td>
                       <td>${val.title}</td>
                       <td>${val.description}</td>
                       <td><button type="button" id="btn-update" class="btn btn-warning" style="color: white;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${val.id}">Update</button></td>
                      <td><button type="button" id="btn-delete" class="btn btn-danger" data-id="${val.id}">Delete</button></td>
                </tr>`
           });
           out += '</tbody>  </table>'
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
    $.ajax({
        type: "post",
        url: Url,
        contentType :"aplication/json",
        dataType: "json",
        data : JSON.stringify({
            title: data['ti'],
            description: data['description'],
            category: data['category']
    }),
        success: function (response) {
            console.log(response);
            console.log(data);
            alert((data['title']) + " insert")
        }
    });
    // fetch(
    //     Url,{
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         title: data['title'],
    //         description: data['descrition'],
    //         category: data['category'] 
    //     })
    // })
    //     .then(res => res.json())
    //     .then(console.log(data))
    //     .then(alert(data['title'] + " insert"))
    
}

function updateData(id) {
    let Url = "https://dummyjson.com/products/";
    // let idData = {
    //     id : id,
    //     title : title,
    //     description : description,
    //     category : category
    // } 
    $.ajax({
        type: "get",
        url: Url + id,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $("#id").val(response.id),
            $("#ti").val(response.title),
            $("#description").val(response.description),
            $("#kategori").val(response.category)
        }
    });
    // fetch(
    //     'https://dummyjson.com/products/' + id,{
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     data: JSON.stringify({
    //         id : $("#id").val(idData.id),
    //         title : $("#title").val(idData.title),
    //         description : $("#description").val(idData.description),
    //         category : $("#kategori").val(idData.category)
    //     })  
    // })
    // .then(res => res.json())
    // .then(console.log(idData))
}

function update() {
    let Url = "https://dummyjson.com/products/";
    let data = {
        title : title,
        description : description,
        category : category
    }
    $.ajax({
        type: "patch",
        url: Url + id,
        contentType :"aplication/json",
        dataType: "json",
        data : JSON.stringify({
            title: data['ti'],
            description: data['description'],
            category: data['category']
    }),
        success: function (response) {
            console.log(response);
            console.log(data);
            alert((data['title']) + " update")
        }
    });
    // fetch(
    //     'https://dummyjson.com/products/' + id,{
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         title: data["title"],
    //         description : data["description"],
    //         category : data['category']
    //       })
    // })
    // .then(res => res.json())
    // .then(console.log(data))
    // .then(alert(data['title'] + " Update"))
}

function Delete(id) {
    let Url =  "https://dummyjson.com/products/"
    $.ajax({
        type: "delete",
        url: Url + id,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response);
            alert(id + " delete");
        }
    });
    // fetch(
    //     'https://dummyjson.com/products/' + id,{
    //     method: 'DELETE',
    // })
    // .then(res => res.json())
    // .then(console.log(id))
    // .then(alert(id + " Delete"))
 }

 
// Pelanggan
$(document).ready(function () {
    let id = "";
    let pelanggan = "";
    let alamat = "";
    let telp = "";
    $("#Simpan").click(function (e) { 
        e.preventDefault();
        id = $("#id").val();
        pelanggan = $("#pel").val();
        alamat = $("#alamat").val();
        telp = $("#telp").val();

        if (id == "") {
            insertPelanggan();
        } else { 
            updatePelanggan();
        }

        $("#id").val("");
        $("#pel").val("");
        $("#alamat").val("");
        $("#telp").val("");
        
    });

    $("#btn-pelanggan").click(function (e) { 
        e.preventDefault();
        selectPelanggan();
    });

    $(".btn-plus").click(function (e) { 
        e.preventDefault();
        
        $("#judul").html("Tambah Data");

        $("#id").val("");
        $("#pel").val("");
        $("#alamat").val("");
        $("#telp").val("");
        
    });

    $(document).on("click", "#btn-ubah" ,function () {
        let id = $(this).attr("data-id");
        $("#judul").html("Ubah Data");
        selectUpdate(id);
    });

    $(document).on("click", "#btn-hapus" ,function () {
        let id = $(this).attr("data-id");
        if (confirm("yakin akan menghapusnya ?")) {
            deletePelanggan(id);
        }
    });

    function selectPelanggan() {
        $.ajax({
            type: "get",
            url: "pages/select.php",
            data: "contentType",
            dataType: "json",
            success: function (response) {
                let out = '<div class="row mt-5"> <h2 id="title">Data Pelanggan</h2> <button type="button" class="btn btn-primary btn-plus" data-bs-toggle="modal" data-bs-target="#pelanggan" > Tambah Pelanggan </button> </div> <table class="table" > <thead> <tr> <th scope="col">No</th> <th scope="col">Nama</th> <th scope="col">Alamat</th><th scope="col">Telp</th><th scope="col">Update</th><th scope="col">Delete</th></tr></thead> <tbody>';
                let no = 1;
                $.each(response, function (key, val) { 
                     out += `<tr>
                        <td>${no++}</td>
                        <td>${val.pelanggan}</td>
                        <td>${val.alamat}</td>
                        <td>${val.telp}</td>
                        <td><button type="button" id="btn-ubah" class="btn btn-warning" style="color: white;" data-bs-toggle="modal" data-bs-target="#pelanggan" data-id="${val.idpelanggan}">Update</button></td>
                        <td><button type="button" id="btn-hapus" class="btn btn-danger" data-id="${val.idpelanggan}">Delete</button></td>
                     </tr>`
                });
                out += "</tbody> </table>"
                $("#isidata").html(out);
            }
        });
    };

    function insertPelanggan() {
        let datapelanggan = {
            pelanggan : pelanggan,
            alamat : alamat,
            telp : telp
        }
        $.ajax({
            type: "post",
            url: "pages/insert.php",
            cache: false,
            data: JSON.stringify(datapelanggan),
            success: function (response) {
                console.log(response);
                alert(response);
            }
        });

        selectPelanggan();
    };

    function selectUpdate(id) {
        let idpelanggan = {
            idpelanggan : id
        }
        $.ajax({
            type: "post",
            url: "pages/selectupdate.php",
            data: JSON.stringify(idpelanggan),
            success: function (response) {
                let data = JSON.parse(response)

                $("#id").val(data.idpelanggan);
                $("#pel").val(data.pelanggan);
                $("#alamat").val(data.alamat);
                $("#telp").val(data.telp);
            }
        });
    };

    function updatePelanggan() {
        let datapelanggan = {
            idpelanggan : id,
            pelanggan : pelanggan,
            alamat : alamat,
            telp : telp
        }
        $.ajax({
            type: "post",
            url: "pages/update.php",
            data: JSON.stringify(datapelanggan),
            success: function (response) {
                console.log(response);
                alert(response);
            }
        });
        selectPelanggan();
    };

    function deletePelanggan(id) {
        let idpelanggan = {
            idpelanggan : id
        }

        $.ajax({
            type: "post",
            url: "pages/delete.php",
            data: JSON.stringify(idpelanggan),
            success: function (response) {
                console.log(response);
                alert(response);
            }
        });
        selectPelanggan();
    }


    
});







