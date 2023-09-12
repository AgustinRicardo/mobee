"use client";

import CrewGroup from "./TabGroup";

interface Props {
  crew: [{ job: string; name: string; department: string }];
}

export default function CrewList({ crew }: Props) {
  const directors = crew.filter((crew) => crew.job === "Director");
  const addDirector = crew.filter(
    (crew) => crew.job.includes("Director") && crew.job !== "Director"
  );
  const producers = crew.filter(
    (crew) => crew.job.includes("Producer") && crew.job !== "Executive Producer"
  );
  const execProducers = crew.filter(
    (crew) => crew.job === "Executive Producer"
  );
  const writers = crew.filter((crew) => crew.job.includes("Writer"));
  const casting = crew.filter((crew) => crew.job.includes("Casting"));
  const editor = crew.filter((crew) => crew.job.includes("Editor"));
  const photoDirectors = crew.filter(
    (crew) => crew.job === "Director of Photography"
  );
  const photo = crew.filter((crew) => crew.job.includes("Photography"));
  const productionDesign = crew.filter(
    (crew) => crew.job === "Production Design"
  );
  const artDirection = crew.filter((crew) =>
    crew.job.includes("Art Direction")
  );
  const setDecoration = crew.filter(
    (crew) =>
      crew.job.includes("Set Decoration") || crew.job.includes("Set Dresser")
  );
  const specialEffects = crew.filter((crew) =>
    crew.job.includes("Special Effects")
  );
  const visualEffects = crew.filter((crew) =>
    crew.job.includes("Visual Effects")
  );
  const stunts = crew.filter((crew) => crew.job.includes("Stunt"));
  const coreographer = crew.filter((crew) =>
    crew.job.includes("Choreographer")
  );
  const compose = crew.filter((crew) => crew.job.includes("Composer"));
  const songs = crew.filter((crew) => crew.job.includes("Songs"));
  const sound = crew.filter(
    (crew) =>
      crew.job.includes("Sound") ||
      crew.job.includes("Music") ||
      crew.department.includes("Sound")
  );
  const costume = crew.filter((crew) => crew.job.includes("Costume"));
  const makeup = crew.filter((crew) => crew.job.includes("Makeup"));
  const hair = crew.filter((crew) => crew.job.includes("Hair"));

  return (
    <div className="mb-5">
      {directors.length !== 0 && (
        <CrewGroup category={directors} title={"DIRECTOR"} />
      )}
      {addDirector && (
        <CrewGroup category={addDirector} title={"ADD. DIRECTING"} />
      )}
      {producers.length !== 0 && (
        <CrewGroup category={producers} title={"PRODUCERS"} />
      )}
      {execProducers && (
        <CrewGroup category={execProducers} title={"EXEC. PRODUCERS"} />
      )}
      {writers.length !== 0 && (
        <CrewGroup category={writers} title={"WRITERS"} />
      )}
      {casting.length !== 0 && (
        <CrewGroup category={casting} title={"CASTING"} />
      )}

      {editor.length !== 0 && <CrewGroup category={editor} title={"EDITORS"} />}
      {photoDirectors && (
        <CrewGroup category={photoDirectors} title={"CINEMATOGRAPHY"} />
      )}
      {photo.length !== 0 && (
        <CrewGroup category={photo} title={"ADD. PHOTOGRAPHY"} />
      )}
      {productionDesign.length !== 0 && (
        <CrewGroup category={productionDesign} title={"PRODUCTION DESIGN"} />
      )}
      {artDirection.length !== 0 && (
        <CrewGroup category={artDirection} title={"ART DIRECTION"} />
      )}
      {setDecoration.length !== 0 && (
        <CrewGroup category={setDecoration} title={"SET DECORATION"} />
      )}
      {specialEffects.length !== 0 && (
        <CrewGroup category={specialEffects} title={"SPECIAL EFFECTS"} />
      )}
      {visualEffects.length !== 0 && (
        <CrewGroup category={visualEffects} title={"VISUAL EFFECTS"} />
      )}
      {stunts.length !== 0 && <CrewGroup category={stunts} title={"STUNTS"} />}
      {coreographer.length !== 0 && (
        <CrewGroup category={coreographer} title={"CHOREOGRAPHY"} />
      )}
      {compose.length !== 0 && (
        <CrewGroup category={compose} title={"COMPOSER"} />
      )}
      {songs.length !== 0 && <CrewGroup category={songs} title={"SONGS"} />}
      {sound.length !== 0 && <CrewGroup category={sound} title={"SOUND"} />}
      {costume.length !== 0 && (
        <CrewGroup category={costume} title={"COSTUME DESIGN"} />
      )}
      {makeup.length !== 0 && <CrewGroup category={makeup} title={"MAKEUP"} />}
      {hair.length !== 0 && <CrewGroup category={hair} title={"HAIRSTYLING"} />}
    </div>
  );
}
