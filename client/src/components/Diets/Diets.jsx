/* import { getDiets } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'


export default function Diets() {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.allDiets)

    useEffect (() => {
        dispatch(getDiets());
    }, [])

    return <div>
        soy las dietas
    </div>

} */