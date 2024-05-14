export type ScoreCondition = boolean | number | ScoreCondition[];

/**
 * Calcula o score de um conjunto de condições usando uma ordem de prioridade da primeira condição para a última.
 * A primeira condição tem peso 1/(2^(n-1) - 1), a segunda 1/(2^(n-2) -1) e assim por diante, onde n é o número de condições.
 * @description Calcula o score de um conjunto de condições usando uma ordem de prioridade da primeira condição para a última.
 * @param conditions Condições a serem avaliadas. Cada condição pode ser um boolean, um número ou um array de condições.
 * No caso de valores numéricos, o valor deve ser entre 0 e 1 e será multiplicado pelo peso da condição.
 * @return O score calculado
 * @author jordyfontoura
 * @license MIT
 * @version 1.0.0
 * @example
 * const isHappy = true;
 * const isHealthy = true;
 * const isWealthy = true;
 *
 * const score = calculateScore([isHappy, isHealthy, isWealthy]);
 * console.log(score); // 1
 *
 * console.log(calculateScore([true, true])) // 1
 * console.log(calculateScore([false, true])) // 0.5
 * console.log(calculateScore([[false, false], true])) // 0.5
 * console.log(calculateScore([[true, false], true])) // 0.75
 * console.log(calculateScore([[false, true], true])) // 0.75
 * console.log(calculateScore([[true, true], true])) // 1
 * console.log(calculateScore([[true, false], [true, false, false, true], true, true])) // 0.6
 */
export function calculateScore(conditions: ScoreCondition[]): number {
  const maxScore = (1 << conditions.length) - 1;
  let score = 0;

  for (let i = 0; i < conditions.length; i++) {
    if (typeof conditions[i] === "boolean") {
      if (conditions[i]) {
        score += 1 << (conditions.length - i - 1);
      }
    } else if (typeof conditions[i] === "number") {
      score += (conditions[i] as number) * (1 << (conditions.length - i - 1));
    } else {
      const contitionsGroup = conditions[i] as ScoreCondition[];
      let delta = calculateGroupScore(contitionsGroup);

      if (delta === 0) {
        continue;
      }

      delta *= 1 << (conditions.length - i - 1);

      score += delta;
    }
  }

  return (score) / maxScore;
}

/**
 * Calcula o score de um conjunto de condições.
 * @param conditions Condições a serem avaliadas. Cada condição pode ser um boolean, um número ou um array de condições.
 * @returns O score calculado
 */
function calculateGroupScore(conditions: ScoreCondition[]): number {
  let score = 0;

  for (let i = 0; i < conditions.length; i++) {
    if (typeof conditions[i] === "boolean") {
      if (conditions[i]) {
        score += 1 / conditions.length;
      }
    } else if (typeof conditions[i] === "number") {
      score += (conditions[i] as number) / conditions.length;
    } else {
      const contitionsGroup = conditions[i] as ScoreCondition[];
      let delta = calculateGroupScore(contitionsGroup);

      if (delta === 0) {
        continue;
      }

      score += delta / conditions.length;
    }
  }

  return score;
}
