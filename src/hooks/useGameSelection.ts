import { useCallback, useState } from 'react';
import { GAMES, PROBLEMS, getGameByFilters, getGameById } from '../../data';
import type { Lab, Problem } from '../../data';

export const useGameSelection = () => {
  const [selectedGame, setSelectedGame] = useState<Lab | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const selectByFilters = useCallback(
    (area: string, topic: string) => {
      const games = getGameByFilters(area, topic);
      if (games.length > 0) {
        setSelectedGame(games[0]);
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

  const selectProblem = useCallback((id: string) => {
    const problem = PROBLEMS.find((p) => p.id === id);
    if (problem) setSelectedProblem(problem);
    return problem;
  }, []);

  return {
    selectedGame,
    selectedProblem,
    selectByFilters,
    selectGame,
    selectProblem,
    availableGames: GAMES,
    availableProblems: PROBLEMS,
  };
};
