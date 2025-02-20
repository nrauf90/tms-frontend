import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"

const DataGrids = (props) => {

    const { handlePageChange } = props
    
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(props.store.data.length === 0){
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [props.store.data])
    
return (
        <DataGrid
        autoHeight
        rowHeight={62}
        rows={props.store.data}
        columns={props.columns}
        loading={loading}
        />
)
}

export default DataGrids