import { AbilityItem } from "./AbilityItem";

interface AbilitiesListProps {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
}

export const AbilitiesList = ({ abilities }: AbilitiesListProps) => (
  <div className="mb-4">
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
      Habilidades
    </h3>
    <div className="space-y-2">
      {abilities.map((abilityInfo, index) => (
        <AbilityItem
          key={index}
          ability={abilityInfo.ability}
          is_hidden={abilityInfo.is_hidden}
        />
      ))}
    </div>
  </div>
);
