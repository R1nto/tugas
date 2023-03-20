<?php 
    require_once "koneksi.php";

    $data = stripslashes(file_get_contents("php://input"));
    $datacart = json_decode($data, true);

    $idorder = $datacart['idorder'];
    $idbarang = $datacart['idbarang'];
    $jumlah = $datacart['jumlah'];
    $harga = $datacart['harga'];
    $barang = $datacart['barang'];
    $idpelanggan = $datacart['idpelanggan'];
    $pelanggan = $datacart['pelanggan'];
    $alamat = $datacart['alamat']; 

    if (!empty($pelanggan)) {
        $sql = "INSERT INTO tblorderdetail VALUES ('',$idorder,$idbarang,$jumlah,$harga,'$barang',$idpelanggan,'$pelanggan','$alamat') ";
        if ($result = mysqli_query($con,$sql)) {
            echo "data sudah ditambahkan";
        } else {
            echo "data belum ditambahkan";
        }
        
    } else {
        echo "data invalid";
    }
    

    
    

    // echo "berhasil";

       
        
  

  

?>