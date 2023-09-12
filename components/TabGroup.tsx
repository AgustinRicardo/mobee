"use client";
import { v4 as uuidv4 } from "uuid";
interface Category {
  job: string;
  name: string;
  department: string;
}
interface Props {
  category: Category[] | [{ name: string }];
  title: string;
}

export default function TabGroup({ category, title }: Props) {
  return (
    <div className="grid grid-cols-2 mt-5">
      <span>{title}</span>
      <ul className="flex flex-wrap">
        {category.map((item) => {
          return (
            <li key={uuidv4()}>
              <div className="bg-beeBrownLightText text-beeBeig rounded-md text-center w-fit m-1 p-1">
                {item.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
