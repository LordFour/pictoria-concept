import { CreativeJourney } from '../scenes/CreativeJourney'
import { ExploreArt } from '../scenes/ExploreArt'
import { FindYourClass } from '../scenes/FindYourClass'
import { CanvasToDigital } from '../scenes/CanvasToDigital'
import { DigitalArt } from '../scenes/DigitalArt'
import { Gallery } from '../scenes/Gallery'
import { InsidePictoria } from '../scenes/InsidePictoria'
import { YourTurn } from '../scenes/YourTurn'
import { Footer } from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

export function Home() {
  usePageTitle()
  return (
    <>
      <main id="main">
        <CanvasToDigital />
        <ExploreArt />
        <DigitalArt />
        <CreativeJourney />
        <Gallery />
        <InsidePictoria />
        <FindYourClass />
        <YourTurn />
      </main>
      <Footer />
    </>
  )
}
