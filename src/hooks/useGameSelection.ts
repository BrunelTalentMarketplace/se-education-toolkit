import { useCallback, useState } from 'react';
import { GAMES, CASE_STUDIES, getGameByFilters, getGameById } from '../../data';
import type { Lab, CaseStudy } from '../../data';

export const useGameSelection = () => {
  const [selectedGame, setSelectedGame] = useState<Lab | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const selectByFilters = useCallback(
    (area: string, topic: string, persona: string) => {
      const games = getGameByFilters(area, topic, persona);
      if (games.length > 0) {
        setSelectedGame(games[0]); // or show selection UI if multiple
        return games;
      }
      return [];
    },
    []
  );

  const selectGame = useCallback((id: string) => {
    const game = getGameById(id);
    if (game) setSelectedGame(game);
    return game;
  }, []);

  const selectCaseStudy = useCallback((id: string) => {
    const caseStudy = CASE_STUDIES.find((cs) => cs.id === id);
    if (caseStudy) setSelectedCaseStudy(caseStudy);
    return caseStudy;
  }, []);

  return {
    selectedGame,
    selectedCaseStudy,
    selectByFilters,
    selectGame,
    selectCaseStudy,
    availableGames: GAMES,
    availableCaseStudies: CASE_STUDIES,
  };
};