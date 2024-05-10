export type ScoreCondition = boolean | ScoreCondition[];

/**
 * Calcula o score de um conjunto de condições
 * @param conditions Condições a serem avaliadas
 * @return O score calculado
 * @example
 * const isHappy = true;
 * const isHealthy = true;
 * const isWealthy = false;
 * 
 * const score = calculateScore([isHappy, isHealthy, isWealthy]);
 * console.log(score); // 7
 * 
 * console.log(calculateScore([true, true])) // 3
 * console.log(calculateScore([false, true])) // 1
 * console.log(calculateScore([[true, true], true])) // 3
 * console.log(calculateScore([[true, false], true])) // 2.5
 * console.log(calculateScore([[false, true], true])) // 2
 * console.log(calculateScore([[false, false], true])) // 1
 * console.log(calculateScore([[true, false], [true, [false, true]], true, true, true])) // 26
 */
export function calculateScore(conditions: ScoreCondition[]): number {
  let score = 0;

  for (let i = 0; i < conditions.length; i++) {
    if (typeof conditions[i] === 'boolean') {
      if (conditions[i]) {
        score += 1 << (conditions.length - i - 1);
      }
    } else {
      const contitionsGroup = conditions[i] as ScoreCondition[];
      let delta = calculateScore(contitionsGroup); 

      if (delta === 0) {
        continue;
      }

      delta++;
      delta /= (1 << (contitionsGroup.length));
      delta *= 1 << (conditions.length - i - 1);

      score += delta;
    }
  }

  return score;
}



console.log(calculateScore([true, true])) // 3
console.log(calculateScore([false, true])) // 1
console.log(calculateScore([[true, true], true])) // 3
console.log(calculateScore([[true, false], true])) // 2.5
console.log(calculateScore([[false, true], true])) // 2
console.log(calculateScore([[false, false], true])) // 1
console.log(calculateScore([[true, false], [true, [false, true]], true, true, true])) // 26