export default function FilterPanel({ feedSources, selectedSource, handleSetSelectedSource }) {

    const radioElems = feedSources.map((source, index) => {
        return (
            <div key={index} className="mb-1">
                <input
                    className="custom-radio"
                    type="radio"
                    id={`source-${index}`}  // Unique id for each radio button
                    name="feedSource"       // All radio buttons in the group should share the same name
                    value={source}          // The value represents the source selected
                    checked={selectedSource === source}  // Check if the current source is selected
                    onChange={handleSetSelectedSource}   // Update state on selection change
                />
                <label className="ms-2" htmlFor={`source-${index}`}>{source}</label>
            </div>
        )
    })

    return (
        <div className="d-flex flex-column">
            <div key={'all'} className="mb-1">
                <input
                    type="radio"
                    className="custom-radio"
                    id={`source-all`}  // Unique id for each radio button
                    name="feedSource"       // All radio buttons in the group should share the same name
                    value={"All"}          // The value represents the source selected
                    checked={selectedSource === "All"}  // Check if the current source is selected
                    onChange={handleSetSelectedSource}   // Update state on selection change
                />
                <label className="ms-2 fst-italic" htmlFor={`source-all`}>all</label>
            </div>
            {radioElems}
        </div>
    )

}