function sayMyName(name:String){
    console.log("Your Name is ", name)
}


export default function FeaturePage(){
    sayMyName("Vibol");
    console.log("Run from server side")
    
    return (
        <div>        
        <h1>My Tile</h1>
        </div>
    )
}