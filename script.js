function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
const { TransitionGroup, CSSTransition } = ReactTransitionGroup;

const roadsterImg ="headphone.png",
  truckImg =
    "phones.png",
  setup = "setupgaming.png";
  studio = "studio.png";


const slides = [
  {
    
    id: 1,
    name: "SMARTphones",
    imgUrl: truckImg,
    desc: "Discover modern smartphones, immersive headphones, and smart digital accessories",
    topSpeed: 75,
    mph: 4.5,
    mileRange: 400,
    bckgHeight: 300,
    carShadowHeight: 300,
    shadowOpacity: 0.2,
  },

  {
    id: 2,
    name: "Headphones",
    imgUrl: roadsterImg,
    desc: "Discover modern smartphones, immersive headphones, and smart digital accessories",
    topSpeed: 255,
    mph: 3,
    mileRange: 520,
    bckgHeight: 250,
    carShadowHeight: 0,
    shadowOpacity: 0.5,
  },

  {
    id: 3,
    name: "sets up",
    imgUrl: setup,
    desc: "Discover modern smartphones, immersive headphones, and smart digital accessories",
    topSpeed: 55,
    mph: 6,
    mileRange: 550,
    bckgHeight: 300,
    carShadowHeight: 250,
    shadowOpacity: 0.2,
  },

  {
    id: 4,
    name: "studios",
    imgUrl: studio ,
    desc: "Discover modern smartphones, immersive headphones, and smart digital accessories",
    topSpeed: 250,
    mph: 1.9,
    mileRange: 620,
    bckgHeight: 340,
    carShadowHeight: 150,
    shadowOpacity: 0.5,
  },

  ];

class SetCSSVariables extends React.Component {
  componentWillReceiveProps(props) {
    Object.keys(props.cssVariables).forEach(function (key) {
      document.documentElement.style.setProperty(key, props.cssVariables[key]);
    });
  }

  render() {
    return this.props.children;
  }
}

 _defineProperty(
  SetCSSVariables,
  "PropTypes",
  { cssVariables: PropTypes.object.isRequired, className: PropTypes.string },
);

function SlideAside(props) {
  const activeCar = props.activeCar;

  return  React.createElement(
    "div",
    { className: "tesla-slide-aside" },
    React.createElement(
     "h1",
      { className: "main-title" },
      "Upgrade your",
      React.createElement("br"),
      React.createElement("span", { className: "teal-text" }, "digital life")
    ),
    React.createElement(
      "p",
      { className: "tesla-slide-aside__desc" },
      activeCar.desc
    ),

  
    React.createElement(
      "a",
      { className: "fancy-btn", href: "Categories.html" },
       " BUY Now",
      React.createElement(
        TransitionGroup,
        null,
        React.createElement(
          CSSTransition,
          {
            key: activeCar.color,
            timeout: { enter: 800, exit: 1000 },
            mountOnEnter: true,
            unmountOnExit: true,
            classNames: "button__border-",
          },
          React.createElement(
            SetCSSVariables,
            { cssVariables: { "--btn-color": activeCar.color } },
            React.createElement("span", { className: "button__border" })
          )
        )
      )
    )
  );
}

SlideAside.PropTypes = {
  activeCar: PropTypes.object.isRequired,
};


function animate(render, duration, easing, next = () => null) {
  const start = Date.now();

  (function loop() {
    const current = Date.now(),
      delta = current - start,
      step = delta / duration;

    if (step > 1) {
      render(1);
      next();
    } else {
      requestAnimationFrame(loop);
      render(easing(step * 2));
    }
  })();
}

const myEasing = BezierEasing(0.4, -0.7, 0.1, 1.5);

class AnimValue extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(
      this,
      "node",

      null,
    );
    _defineProperty(this, "timeout", null);
    _defineProperty(
      this,
      "setValue",

      (value, step) => {
        if (!this.node) {
          return;
        }

        if (step === 1) {
          this.node.style.opacity = 1;
        } else {
          this.node.style.opacity = 0.7;
        }

        this.node.innerHTML = value;
      },
    );
  }
  animate(previousValue, newValue, applyFn) {
    window.clearTimeout(this.timeout);
    const diff = newValue - previousValue;
    const renderFunction = (step) => {
      this.timeout = setTimeout(() => {
        applyFn(
          this.props.transformFn(previousValue + diff * step, step),
          step,
        );
      }, this.props.delay);
    };
    animate(renderFunction, this.props.duration, myEasing);
  }

  componentDidMount() {
    this.animate(0, this.props.value, this.setValue);
  }

  componentWillReceiveProps(props) {
    let previousValue = this.props.value;

    if (previousValue !== props.value) {
      this.animate(previousValue, props.value, this.setValue);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
    this.timeout = null;
  }

  render() {
    return React.createElement("span", {
      className: this.props.className,
      children: "0",
      ref: (node) => (this.node = node),
    });
  }
}
_defineProperty(AnimValue, "defaultProps", {
  delay: 0,
  duration: 800,
  transformFn: (value) => Math.floor(value),
});

class AnimateValue extends React.Component {
  render() {
    return  React.createElement(AnimValue, {
      className: this.props.className,
      delay: this.props.delay,
      value: this.props.value,
      transformFn: (value, step) =>
        step === 1
          ? value % 1 != 0
            ? value.toFixed(1)
            : value
          : Math.abs(Math.floor(value)),
    });
  }
}

let DELAY_TOP_SPEED = 200,
  DELAY_MPH = 700,
  DELAY_MILE_RANG = 1200;

class SlideParams extends React.Component {
  componentWillReceiveProps(props) {
    if (!props.animationForward) {
      DELAY_TOP_SPEED = 1200;
      DELAY_MILE_RANG = 200;
    } else {
      DELAY_TOP_SPEED = 200;
      DELAY_MILE_RANG = 1200;
    }
  }

  render() {
    const { activeCar } = this.props;

    return  React.createElement(
      "div",
      { className: "tesla-slide-params" },
      React.createElement("ul", { className: "tesla-slide-params__list" })
    );
  }
}
_defineProperty(SlideParams, "PropTypes", {
  activeCar: PropTypes.object.isRequired,
  animationForward: PropTypes.bool.isRequired,
});

class Slide extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(
      this,
      "handleEnter",

      (e) => {
        this.props.setAnimationState(this.props.ANIMATION_PHASES.STOP);
      },
    );
  }

  render() {
    const { activeSlide, animationForward } = this.props;

    return  React.createElement(
      "div",
      {
        className: `tesla-slide ${animationForward ? "animation-forward" : "animation-back"}`,
      } ,
      React.createElement(SlideAside, { activeCar: activeSlide }) ,

      React.createElement(
        TransitionGroup,
        null ,
        React.createElement(
          CSSTransition,
          {
            key: activeSlide.name,
            timeout: { enter: 800, exit: 1000 },
            classNames: "tesla-slide__bckg-",
            mountOnEnter: true,
            unmountOnExit: true,
          } ,

          React.createElement(
            SetCSSVariables,
            {
              cssVariables: {
                "--car-color": activeSlide.color,
                "--bckg-height": activeSlide.bckgHeight + "px",
                "--shadow-opacity": activeSlide.shadowOpacity,
                "--car-shadow-height": activeSlide.carShadowHeight + "px",
              },
            } ,

            React.createElement(
              "div",
              { className: "tesla-slide__bckg" } ,
              React.createElement("div", {
                className: "tesla-slide__bckg-fill",
              }),
            ),
          ),
        ),
      ),

      React.createElement(
        TransitionGroup,
        null ,
        React.createElement(
          CSSTransition,
          {
            key: activeSlide.name,
            timeout: { enter: 700, exit: 1200 },
            classNames: "tesla-slide__img-",
            mountOnEnter: true,
            unmountOnExit: true,
            onEntered: this.handleEnter,
          } ,

          React.createElement(
            "div",
            { className: "tesla-slide__img" } ,
            React.createElement("img", {
              className: "tesla-slide__img-floor",
              src: activeSlide.imgFloorUrl,
              alt: "",
            }) ,
            React.createElement("img", {
              className: "tesla-slide__img-car",
              src: activeSlide.imgUrl,
              alt: "",
            }),
          ),
        ),
      ) ,

      React.createElement(SlideParams, {
        activeCar: activeSlide,
        animationForward: animationForward,
      }),
    );
  }
}
_defineProperty(Slide, "PropTypes", {
  activeSlide: PropTypes.object.isRequired,
  animationForward: PropTypes.bool.isRequired,
  setAnimationState: PropTypes.func.isRequired,
  ANIMATION_PHASES: PropTypes.object.isRequired,
});

class SliderNavigation extends React.Component {
  render() {
    return  React.createElement(
      "div",
      { className: "tesla-slider-navigation" } ,
      React.createElement(
        "ul",
        { className: "tesla-slider-navigation__list" },
        this.props.carsNames.map((car ) =>
          React.createElement(
            "li",
            {
              key: car.id,
              className: "tesla-slider-navigation__item",
            } ,
            React.createElement(
              "a",
              {
                href: "#",
                onClick: (event) => {
                  event.preventDefault();
                  this.props.setActiveSlide(this.props.carsNames.indexOf(car));
                },
                className: `tesla-slider-navigation__link ${
                  this.props.carsNames[this.props.activeSlide] === car
                    ? "tesla-slider-navigation__link--active"
                    : ""
                }`,
                style: {
                  color:
                    this.props.carsNames[this.props.activeSlide] === car
                      ? car.color
                      : "",
                },
              },

              car.name,
            ),
          ),
        ),
      ),
    );
  }
}
_defineProperty(SliderNavigation, "PropTypes", {
  setActiveSlide: PropTypes.func.isRequired,
  carsNames: PropTypes.array.isRequired,
});

const logoTesla =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/logoTesla.svg",
  mouseImg = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/mouse.svg",
  hamburger =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/hamburger.svg";



const ANIMATION_PHASES = {
  PENDING: "PENDING",
  STOP: "STOP",
};

class Slider extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      activeSlide: 0,
      animationForward: true,
      slidesCount: slides.length,
      animationState: null,
    });
    _defineProperty(
      this,
      "slider",

      {
        header: "",
        content: "",
      },
    );
    _defineProperty(
      this,
      "setAnimationState",

      (animationState) => this.setState({ animationState }),
    );
    _defineProperty(
      this,
      "setActiveSlide",

      (slideId) => {
        this.setState({
          activeSlide: slideId,
          animationForward: this.state.activeSlide < slideId ? true : false,
        });

        this.setAnimationState(ANIMATION_PHASES.PENDING);
      },
    );
    _defineProperty(
      this,
      "timeout",

      null,
    );
    _defineProperty(
      this,
      "handleScroll",

      (e) => {
        let sliderHeight = this.slider.content.clientHeight,
          headerHeight = this.slider.header.clientHeight;

        if (window.innerHeight < sliderHeight + headerHeight) {
          return;
        }

        e.preventDefault();

        window.clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          if (e.deltaY < 0 && this.state.activeSlide !== 0) {
            this.setActiveSlide(this.state.activeSlide - 1);
          }
          if (
            e.deltaY > 0 &&
            this.state.activeSlide !== this.state.slidesCount - 1
          ) {
            this.setActiveSlide(this.state.activeSlide + 1);
          }
        }, 50);
      },
    );
  }
  componentDidMount() {
    this.setState({ activeSlide: 3 });
    this.setAnimationState(ANIMATION_PHASES.PENDING);
    this.slider.header = document.querySelector(".tesla-header");
    this.slider.content = document.querySelector(".tesla-slider");
    document.body.addEventListener("wheel", this.handleScroll);
  }

  componentWillUnmount() {
    document.body.removeEventListener("wheel", this.handleScroll);
    window.clearTimeout(this.timeout);
    this.timeout = null;
  }

  render() {
    return  React.createElement(
      "div",
      { className: "tesla-slider" } ,
      React.createElement(SliderNavigation, {
        activeSlide: this.state.activeSlide,
        setActiveSlide: this.setActiveSlide,
        carsNames: slides.map((slide) => ({
          id: slide.id,
          name: slide.name,
          color: slide.color,
        })),
      }) ,

      React.createElement(Slide, {
        animationForward: this.state.animationForward,
        activeSlide: slides[this.state.activeSlide],
        animationState: this.state.animationState,
        setAnimationState: this.setAnimationState,
        ANIMATION_PHASES: ANIMATION_PHASES,
      }) ,

      React.createElement(
        "div",
        { className: "tesla-slider__scroll" } ,
        React.createElement("img", { src: mouseImg, alt: "" }),
      ),
    );
  }
}


function Header() {
  return React.createElement(
    "div",
    { className: "tesla-header" },

    
    React.createElement(
      "div",
      { className: "tesla-header__logo" },
      React.createElement("span", { className: "custom-logo" }, "DigitALWorlD")
    ),

    
    React.createElement(
      "div",
      { className: "tesla-header__nav" },
      React.createElement("ul", { className: "nav-links" },
        React.createElement("li", null, React.createElement("a", { href: "#home" }, "Home")),
        React.createElement("li", null, React.createElement("a", { href: "#categories" }, "Categories")),
        React.createElement("li", null, React.createElement("a", { href: "about.html" }, "About Us")),
        React.createElement("li", null, React.createElement("a", { href: "contact.html" }, "Contact Us"))
      )
    )
  );
}
const AboutSection = () =>
  React.createElement(
    "section",
    { id: "#about", className: "section" },
    React.createElement("h2", null, "About Us"),
    React.createElement(
      "p",
      null,
      "Bienvenue sur DigitalWorld, votre plateforme dédiée aux produits 100% digitaux : ebooks, templates, scripts, cours en ligne et outils professionnels pour booster vos projets."
    ),
    React.createElement(
      "p",
      null,
      "Notre objectif est de fournir des produits numériques accessibles, instantanément téléchargeables et de haute qualité pour aider les créateurs, entrepreneurs et étudiants."
    )
  );

class App extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Slider, null)
    );
  }
}

ReactDOM.render(
   React.createElement(App, null),
  document.getElementById("root"),
);