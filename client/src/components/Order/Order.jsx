const ASCENDENTE = 'ascendente'
const DESCENDENTE = 'descendente'

export default function Order() {


    return <div>
         <select name="select" /* onChange={onSelectChange} */>
            <option value={ASCENDENTE}>ascendente</option>
            <option value={DESCENDENTE}>descendente</option>
        </select>
    </div>
}