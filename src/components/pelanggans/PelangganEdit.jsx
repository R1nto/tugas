import {useContext, useEffect} from "react";
import SkillContext from "../../context/SkillContext";
import { useParams } from "react-router-dom";

export const PelangganEdit = () => {
    const {formPelanggans,onPelanggans,updatePelanggan,getPelanggan,erorrs,setErrors} = useContext(SkillContext);
    let {id} = useParams();
    useEffect(() => {
        getPelanggan(id);
        setErrors({});
    },[])
    return (
        <div className="mt-12">
            <form onSubmit={updatePelanggan} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
                <div className="space-y-6">
                    <div className="mb-4"><label htmlFor="pelanggan" className="block mb-2 text-sm font-medium">Pelanggan :</label></div>
                    <input name="pelanggan" value={formPelanggans['pelanggan']} onChange={onPelanggans} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.pelanggan && (<span className="text-sm text-red-400">{erorrs.pelanggan[0]}</span>)}
                    <div className="mb-4"><label htmlFor="alamat" className="block mb-2 text-sm font-medium">Alamat :</label></div>
                    <input name="alamat" value={formPelanggans['alamat']} onChange={onPelanggans} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.alamat && (<span className="text-sm text-red-400">{erorrs.alamat[0]}</span>)}
                    <div className="mb-4"><label htmlFor="telp" className="block mb-2 text-sm font-medium">Telp :</label></div>
                    <input name="telp" value={formPelanggans['telp']} onChange={onPelanggans} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                    {erorrs.telp && (<span className="text-sm text-red-400">{erorrs.telp[0]}</span>)}
                </div>
                <div className="my-4">
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">update</button>
                </div>
            </form>
        </div>
    )
}