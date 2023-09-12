"use client";

import DetailsGroup from "./TabGroup";

interface Props {
  companies: [{ id: number; name: string }];
  countries: [{ name: string }];
}

export default function DetailsList({ companies, countries }: Props) {
  return (
    <div className="mb-5">
      {companies && <DetailsGroup category={companies} title={"STUDIOS"} />}
      {companies && <DetailsGroup category={countries} title={"COUNTRIES"} />}
    </div>
  );
}
