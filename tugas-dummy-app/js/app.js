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

$(document).on("click", ".btn-cart" ,function () {
    let id = $(this).attr("data-cart");
    cart(id);
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
            let out = '<div class="row mt-5"> <h2 id="title">Data Dummy</h2> <button type="button" class="btn btn-primary btn-tambah" data-bs-toggle="modal" data-bs-target="#exampleModal"> Tambah Barang </button> </div> <table class="table" > <thead> <tr> <th scope="col">No</th> <th scope="col">Title</th> <th scope="col">Description</th><th scope="col">Update</th><th scope="col">Delete</th><th scope="col">Cart</th></tr></thead> <tbody>';
            let no=1;
            $.each(response.products, function (key, val) { 
                 out += `<tr>
                        <td>${no++}</td>
                        <td>${val.title}</td>
                        <td>${val.description}</td>
                        <td><button type="button" id="btn-update" class="btn btn-warning" style="color: white;" data-bs-toggle="modal"
                         data-bs-target="#exampleModal" data-id="${val.id}">Update</button></td>
                        <td><button type="button" id="btn-delete" class="btn btn-danger" data-id="${val.id}">Delete</button></td>
                        <td><button type="button" class="btn btn-danger btn-cart" data-cart="${val.id}">Cart</button></td>
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
    
    
}

function updateData(id) {
    let Url = "https://dummyjson.com/products/";
    
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
    
 }

 function cart(id){
    let Url = "https://dummyjson.com/products/"
    let crot = "";
    $.ajax({
        type: "get",
        url: Url + id,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response.id);
            // console.log(response.title);
            // console.log(response.price);
            // alert(response.title);
            // alert(response.id);
            // alert(response.price);
            
            crot += `<table class="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>price</th>
                    <th>Id Order By</th>
                    <th>Order By</th>
                    <th>Alamat</th>
                </tr>
            </thead>
            <tbody> 
                <tr>
                    <td id="idbarang">${response.id}</td>
                    <td id="barang">${response.title}</td>
                    <td id="harga">${response.price}</td>
                    <td id="id" class="id"></td>
                    <td id="pelanggan" class="pelanggan"></td>
                    <td id="alamat" class="alamat"></td>
                    <td><button type="submit" id="beli" class="btn btn-primary">Beli</button></td>
                </tr> 
            </tbody>
            </table> `;
            $("#cart").html(crot);
        } 
    });
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
            url: "http://localhost/tugas-dummy/pages/select.php",
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
                        <td><button type="button" id="btn-pembeli" class="btn btn-danger" data-id="${val.idpelanggan}">Pembeli</button></td>
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
            url: "http://localhost/tugas-dummy/pages/insert.php",
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
            url: "http://localhost/tugas-dummy/pages/selectupdate.php",
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
            url: "http://localhost/tugas-dummy/pages/update.php",
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
            url: "http://localhost/tugas-dummy/pages/delete.php",
            data: JSON.stringify(idpelanggan),
            success: function (response) {
                console.log(response);
                alert(response);
            }
        });
        selectPelanggan();
    };

    function showPelangga(id) {
        let out = "";
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-dummy/pages/selectwhere.php?id=" + id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                out += `<table class="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>pelanggan</th>
                        <th>alamat</th>
                        <th>telp</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>${response.idpelanggan}</td>
                        <td>${response.pelanggan}</td>
                        <td>${response.alamat}</td>
                        <td>${response.telp}</td>
                    </tr> 
                </tbody>
                </table>`;
                $("#pembeli").html(out);
            }
        });
    }

    function showPelanggan(id) {
        let out = "";
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-dummy/pages/selectwhere.php?id=" + id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                console.log(response);
                out += response.pelanggan;
                $(".pelanggan").html(out);
            }
        });
    }

    function idPelanggan(id) {
        let out = "";
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-dummy/pages/selectwhere.php?id=" + id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                console.log(response);
                out += response.idpelanggan;
                $(".id").html(out);
            }
        });
    }

    function alamatPelanggan(id) {
        let out = "";
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-dummy/pages/selectwhere.php?id=" + id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                console.log(response);
                out += response.alamat;
                $(".alamat").html(out);
            }
        });
    }

    $(document).on("click", "#btn-pembeli" ,function () {
        let id = $(this).attr("data-id");
        showPelanggan(id);
    });

    $(document).on("click", "#btn-pembeli" ,function () {
        let id = $(this).attr("data-id");
        idPelanggan(id);
    });

    $(document).on("click", "#btn-pembeli" ,function () {
        let id = $(this).attr("data-id");
        alamatPelanggan(id);
    });

    $(document).on("click", "#btn-pembeli" ,function () {
        let id = $(this).attr("data-id");
        showPelangga(id);
    });


    
});



$(document).on("click", "#beli" ,function () {
    idbarang = $("#idbarang").text();
    barang = $("#barang").text();
    harga = $("#harga").text();
    idpelanggan = $("#id").text();
    pelanggan = $("#pelanggan").text();
    alamat = $("#alamat").text();
    
    console.log(idbarang,barang,harga,id,pelanggan,alamat);
    addTocart();
});

function addTocart() {
    let idorder = 1;
    let jumlah = 1;
    let datacart = {
        idorder : idorder,
        idbarang : idbarang,
        jumlah : jumlah,
        harga : harga,
        barang : barang,
        idpelanggan : idpelanggan,
        pelanggan : pelanggan,
        alamat : alamat
    } 
    $.ajax({
        type: "post",
        url: "http://localhost/tugas-dummy/pages/addtocart.php",
        data: JSON.stringify(datacart),
        success: function (response) {
            console.log(response);
            alert(response);
        }
    });
}




