import chalk from "chalk";
import { API } from "./index";
import { log } from "../log";
import { listMoviesMenu } from "../menu";

const listMovies = (list: Array<any>, origin: string) => {
  console.clear();
  switch (origin) {
    case "popularMovies":
      log(chalk.bold.italic("Top 10 Filmes mais Populares: \n"));
      list.forEach((movie, index) => {
        log(
          `${chalk.yellow(index + 1)} - ${chalk.bold(
            movie.title
          )} - ${chalk.italic(`Ano de Lançamento: ${movie.year}`)}`
        );
      });
      break;
    case "anticipatedMovies":
      log(chalk.bold.italic("Top 10 Filmes mais Aguardados: \n"));
      list.forEach((item, index) => {
        log(
          `${chalk.yellow(index + 1)} - ${chalk.bold(
            item.movie.title
          )} - ${chalk.italic.underline(
            `Menções na Internet: ${item.list_count}`
          )} - ${chalk.italic(`Ano de Lançamento: ${item.movie.year}`)}`
        );
      });
      break;
    case "recommendedMovies":
      log(chalk.bold.italic("Top 10 Recomendações da Semana: \n"));
      list.forEach((item, index) => {
        log(
          `${chalk.yellow(index + 1)} - ${chalk.bold(
            item.movie.title
          )} - ${chalk.italic.underline(
            `Número de Recomendações: ${item.user_count}`
          )} - ${chalk.italic(`Ano de Lançamento: ${item.movie.year}`)}`
        );
      });
      break;
  }

  listMoviesMenu(list, origin);
};

const listPopularMovies = async () => {
  try {
    const response = await API.get("movies/popular?extended=full");
    const { data } = response;
    // console.log(data);

    listMovies(data, "popularMovies");
  } catch (err) {
    console.error(err);
  }
};

const listAnticipatedMovies = async () => {
  try {
    const response = await API.get("movies/anticipated?extended=full");
    const { data } = response;

    listMovies(data, "anticipatedMovies");
  } catch (err) {
    console.error(err);
  }
};

const listRecommendedMovies = async () => {
  try {
    const response = await API.get("movies/recommended/weekly?extended=full");
    const { data } = response;

    listMovies(data, "recommendedMovies");
  } catch (err) {
    console.error(err);
  }
};

export {
  listPopularMovies,
  listAnticipatedMovies,
  listRecommendedMovies,
  listMovies,
};
