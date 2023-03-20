import { useEffect,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkillContext from "../../context/SkillContext";

export const CartIndex = () => {
    let no = 1;

    const {cartProduct,cartPelanggan,tambah,kurang,checkout,counter} = useContext(SkillContext);

    return (
        <div className='mt-12'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">NO</th>
                        <th scope="col" className="px-6 py-3">ID BARANG</th>
                        <th scope="col" className="px-6 py-3">JUMLAH</th>
                        <th scope="col" className="px-6 py-3">HARGA</th>
                        <th scope="col" className="px-6 py-3">BARANG</th>
                        <th scope="col" className="px-6 py-3">IDPELANGGAN</th>
                        <th scope="col" className="px-6 py-3">PELANGGAN</th>
                        <th scope="col" className="px-6 py-3">ALAMAT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{no++}</td>
                        <td className="px-6 py-4">{cartProduct.id}</td>
                        <td className="px-6 py-4">
                            <button onClick={kurang} className='px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md'>-</button>
                            {counter}
                            <button onClick={tambah} className='px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md'>+</button>
                        </td>
                        <td className="px-6 py-4">{cartProduct.price * counter}</td>
                        <td className="px-6 py-4">{cartProduct.title}</td>
                        <td className="px-6 py-4">{cartPelanggan.id}</td>
                        <td className="px-6 py-4">{cartPelanggan.pelanggan}</td>
                        <td className="px-6 py-4">{cartPelanggan.alamat}</td>
                    </tr>
                </tbody>
            </table>

            <div className='flex justify-end m-2 p-2'>
                <button onClick={checkout} className='px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md'>Pay</button>
            </div>
        </div>
    )
}