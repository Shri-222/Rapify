
export default function JSONViewer ( { title, data }) {

    return ( 
        <div>
            <h3> { title }</h3>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}