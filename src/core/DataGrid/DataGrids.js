import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import PaginationComponent from "./component/pagination/PaginationComponent"

const DataGrids = (props) => {
    
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(props.store.data.length === 0){
            setLoading(true)
        } else {
            setLoading(false)
        }
        if(props.store.code == 404){
            setLoading(false)
        }
    }, [props.store])
    
return (
        <DataGrid
        autoHeight
        rowHeight={62}
        rows={props.store.data}
        columns={props.columns}
        loading={loading}
        components={{
            Pagination: () => <PaginationComponent page={props.page} setPage={props.setPage} lastCount={props.lastCount} length={props.length} setLength={props.setLength} />
          }}
        />
)
}

export default DataGrids