// App imports.
import * as Users from "./Users";
import * as Movies from "./Movies"
import * as Reviews from "./Reviews"

/**
 * This function must be called once and only once from BaseLayout.
 */
export function createState(inParentComponent) {

  return {

    //informacoes do user que fez login
    userName: null,
    userId: null,
    userEmail: null,
    userPassword: null,
    profilepic: 'defaultPFP.png',

    // The view that is currently showing ("welcome", "login", "register", "products", "welcomeUser", "farewellUser" or "registerMessage").
    currentView: "welcome",

    // ------------------------------------------------------------------------------------------------
    // ---------------------------------------- List functions for set the currentView ----------------
    // ------------------------------------------------------------------------------------------------
    //estas funcoes permitem alterar a variavel currentView de modo a saber qual o ficheiro a renderizar
    
    /**
     * Show WelcomeView in add mode.
     */
    showWelcome: function (): void {
      this.setState({ currentView: "welcome" })
    }.bind(inParentComponent),

    /**
     * Show LoginView in add mode.
     */
    showLogin: function (): void {
      this.setState({ currentView: "login" })
    }.bind(inParentComponent),

    /**
     * Show RegisterView in add mode.
     */
    showRegister: function (): void {
      this.setState({ currentView: "register" })
    }.bind(inParentComponent),

    /**
     * Show Products(a lista dos filmes) in add mode.
     */
    showProducts: function (): void {
      this.setState({ currentView: "products" })
    }.bind(inParentComponent),

    // ------------------------------------------------------------------------------------------------
    // ---------------------------------------- List functions ----------------------------------------
    // ------------------------------------------------------------------------------------------------


    // ------------------------------------------------------------------------------------------------
    // ------------------------------------ Event Handler functions -----------------------------------
    // ------------------------------------------------------------------------------------------------
    
    /**
     * Lista dos filmes existentes na base de dados (from server)
     */
    productsFilm: async function (): Promise<Movies.IMovie[]> {

      const moviesWorker: Movies.Worker = new Movies.Worker();

      const movies = await moviesWorker.getMovies();
      return movies;

    }.bind(inParentComponent),

    /**
     * Average do rating do filme em expecifico de acordo com as reviews (from the server).
     * 
     * @param movieID o movieid
     */
    averageRating: async function (movieID: string): Promise<number> {
      const reviewWorker: Reviews.Worker = new Reviews.Worker();
      const average = await reviewWorker.averageReviews(movieID);
      return average;
    }.bind(inParentComponent),

    /**
     * Lista de reviews de um determinado movie (from the server).
     * 
     * @param movieID o movieid
     */
    reviews: async function (movieID: string): Promise<Reviews.IReview[]> {
      try {
        const reviewWorker: Reviews.Worker = new Reviews.Worker();
        const reviews: Reviews.IReview[] = await reviewWorker.getReviews(movieID);
        return reviews;
      }
      catch (error) {
        return error;
      }

    }.bind(inParentComponent),


    /**
     * Post review (to the server).
     * 
     * @param review a review do movie do tipo IReview
     */
    postReview: async function (review: Reviews.IReview): Promise<Reviews.IReview> {
      const reviewWorker: Reviews.Worker = new Reviews.Worker();
      const res: Reviews.IReview = await reviewWorker.postReview(review);
      return res;

    }.bind(inParentComponent),

    /**
     * Edit review (from the server).
     * 
     * @param review a review do movie do tipo IReview
     */
    editReview: async function (review: Reviews.IReview): Promise<Reviews.IReview> {
      const reviewWorker: Reviews.Worker = new Reviews.Worker();
      const res: Reviews.IReview = await reviewWorker.editReview(review);
      return res;

    }.bind(inParentComponent),

    /**
     * Delete review (from the server).
     * 
     * @param movieID o id do movie que queremos eliminar
     * @param userId o id do user que fez a review
     */
    delReview: async function (movieID: string, userId: string): Promise<string> {
      const reviewWorker: Reviews.Worker = new Reviews.Worker();
      const response = await reviewWorker.deleteReview(movieID, userId);

      return response;

    }.bind(inParentComponent),

    /**
     * Get user (from the server).
     * 
     * @param userId o id do user que queremos obter
     */
    getUser: async function (userID:string): Promise<Users.IUser> {
      try {
        const reviewWorker: Users.Worker = new Users.Worker();
        const user: Users.IUser = await reviewWorker.getUser(userID);
        return user;
      }
      catch (error) {
        return error;
      }

    }.bind(inParentComponent),


    /**
     * Login do user.
     * 
     * @param email o email do user
     * @param password a pass do user
     */
    loginUser: async function (email:string, password:string): Promise<boolean> {

      const usersWorker: Users.Worker = new Users.Worker();

      const user: Users.IUser = await usersWorker.tryLogin(email, password);
      if (user.name != null) {
        await this.setState({ userName: user.name, userEmail: user.email, userPassword: user.password, userId: user._id, currentView: "welcomeUser" });
        return true;
      }
      else
        return false;

    }.bind(inParentComponent),

    /**
     * Logout user .
     */
    logoutUser: async function (): Promise<void> {
      await this.setState({ userName: null, userEmail: null, userPassword: null, currentView: "farewellUser" });

    }.bind(inParentComponent),
    
    /**
     * Register user.
     * 
     * @param User o user do tipo IUser que contem todas as informacoes para fazer o registo
     */
    registerUser: async function (User: Users.IUser): Promise<void> {
      const usersWorker: Users.Worker = new Users.Worker();

      const user: Users.IUser = await usersWorker.tryRegister(User);

      if (user.name != null) {
        await this.setState({ currentView: "registerMessage" });
      }

    }.bind(inParentComponent),

  };

} /* End createState(). */


