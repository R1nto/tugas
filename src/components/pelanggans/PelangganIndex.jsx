import {useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import SkillContext from "../../context/SkillContext";

export const PelangganIndex = () => {
    const {pelanggans,getPelanggans,deletePelanggan,pelangganCart} = useContext(SkillContext);
    useEffect(() => {
        getPelanggans();
    }, []);
    return (
        <div className="mt-12">
            <div className="flex justify-end m-2 p-2">
                <Link to="/pelanggans/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">New Pelanggan</Link>
            </div>   
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Pelanggan</th>
                            <th scope="col" className="px-6 py-3">Alamat</th>
                            <th scope="col" className="px-6 py-3">Telp</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                            <th scope="col" className="px-6 py-3">Pembeli</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pelanggans.map(pelanggan=>{return (
                        <tr key={pelanggan.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{pelanggan.pelanggan}</td>
                            <td className="px-6 py-4">{pelanggan.alamat}</td>
                            <td className="px-6 py-4">{pelanggan.telp}</td>
                            <td className="px-6 py-4"><Link to={`/pelanggans/${pelanggan.id}/edit`} className="px-4 py-2 bg-yellow-500 hover:bg-indigo-700 text-white rounded-md">Edit</Link></td>
                            <td className="px-6 py-4"><button onClick={() => deletePelanggan(pelanggan.id)} className="px-4 py-2 bg-red-500 hover:bg-indigo-700 text-white rounded-md">Delete</button></td>
                            <td className="px-6 py-4"><button onClick={() => pelangganCart(pelanggan.id)} className="px-4 py-2 bg-red-500 hover:bg-indigo-700 text-white rounded-md">Pembeli</button></td>
                        </tr>
                         
                    )})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}