import { Link } from "react-router-dom";

function Sources() {
  return (
//     <p>Our sources:
//       <li> Gridwatch.co.uk </li>
//       <li> https://ourworldindata.org/travel-carbon-footprint </li>
//       <li> https://josephpoore.com/Science%20360%206392%20987%20-%20Accepted%20Manuscript.pdf </li>
//     </p>
//   )
// }

  <div className="flex justify-center mt-44">
    <div className="font-mono bg-zinc-100 border rounded-3xl flex justify-center box-border h-2/5 w-2/5 p-4 mb-40 ml-24 mr-24">
     <div className="flex justify-center"></div>
      <table className="mt-10 mb-10 text-center">
      
        <tr className="inline text-center pb-4 text-3xl mt-10"> Our sources:</tr>
        <tr><br /></tr>
        <tr><li> <Link to ="Gridwatch.co.uk" className="text-lime-600 hover:bg-gray-200">Gridwatch</Link> </li></tr>
        <tr><br /></tr>
        <tr><li> <Link to ="Ourworldindata.org" className="text-lime-600 hover:bg-gray-200">Ourworldindata</Link> </li></tr>
        <tr><br /></tr>
        <tr><li> <Link to ="Josephpoore.com" className="text-lime-600 hover:bg-gray-200">Josephpoore</Link></li></tr>
        <tr><br /></tr>
        <tr><li> <Link to ="Treesforlife.org.uk" className="text-lime-600 hover:bg-gray-200">Treesforlife</Link></li></tr>
        <tr><br /></tr>
        <tr><li> <Link to ="Earthly.org" className="text-lime-600 hover:bg-gray-200">Earthly </Link></li></tr>
      </table>
    </div>
  </div>

// links
// https://Gridwatch.co.uk"
// https://ourworldindata.org/travel-carbon-footprint
// https://josephpoore.com/Science%20360%206392%20987%20-%20Accepted%20Manuscript.pdf
//https://treesforlife.org.uk/
  )
}

export default Sources;

  // bulbs avg year usage(8h) 79,400g CO2 source: Gridwatch.co.uk - https://savinglightbulb.wordpress.com/2018/10/11/how-much-co2-does-a-light-bulb-create/
  // beef 50,000g per serving https://josephpoore.com/Science%20360%206392%20987%20-%20Accepted%20Manuscript.pdf
  // planting one tree = 160,000g CO2 saved (source: treesforlife)
  // one shower = 3066 g (per 15 min shower - the eco guide)
  // cup of coffee - 280g (UCL)