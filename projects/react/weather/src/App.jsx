import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./App.css";

const SEARCH_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const MAX_SUGGESTIONS = 6;
const HOUR_SLOTS = [6, 9, 12, 15, 18, 21];

const WEATHER_STYLES = {
  0: { label: "Clear", tone: "clear" },
  1: { label: "Mostly clear", tone: "clear" },
  2: { label: "Partly cloudy", tone: "cloud" },
  3: { label: "Overcast", tone: "cloud" },
  45: { label: "Fog", tone: "mist" },
  48: { label: "Rime fog", tone: "mist" },
  51: { label: "Light drizzle", tone: "rain" },
  53: { label: "Drizzle", tone: "rain" },
  55: { label: "Heavy drizzle", tone: "rain" },
  56: { label: "Freezing drizzle", tone: "rain" },
  57: { label: "Heavy freezing drizzle", tone: "rain" },
  61: { label: "Light rain", tone: "rain" },
  63: { label: "Rain", tone: "rain" },
  65: { label: "Heavy rain", tone: "rain" },
  66: { label: "Freezing rain", tone: "rain" },
  67: { label: "Heavy freezing rain", tone: "rain" },
  71: { label: "Light snow", tone: "snow" },
  73: { label: "Snow", tone: "snow" },
  75: { label: "Heavy snow", tone: "snow" },
  77: { label: "Snow grains", tone: "snow" },
  80: { label: "Rain showers", tone: "rain" },
  81: { label: "Heavy showers", tone: "rain" },
  82: { label: "Violent showers", tone: "storm" },
  85: { label: "Snow showers", tone: "snow" },
  86: { label: "Heavy snow showers", tone: "snow" },
  95: { label: "Thunderstorm", tone: "storm" },
  96: { label: "Storm with hail", tone: "storm" },
  99: { label: "Severe storm", tone: "storm" },
};

const formatLocationLabel = (place) => {
  const parts = [place.name, place.admin1, place.country].filter(Boolean);
  return parts.join(", ");
};

const weatherForCode = (code) => WEATHER_STYLES[code] || { label: "Mixed weather", tone: "cloud" };

const WEATHER_ICONS = {
  clear: "sun",
  cloud: "cloud",
  mist: "mist",
  rain: "rain",
  snow: "snow",
  storm: "storm",
};

const LOADING_CARDS = Array.from({ length: 5 }, (_, index) => `loading-${index}`);

function WeatherGlyph({ tone }) {
  const icon = WEATHER_ICONS[tone] || WEATHER_ICONS.cloud;

  if (icon === "sun") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="5" className="weather-glyph__stroke" />
        <path
          d="M16 3.5V7.5M16 24.5V28.5M28.5 16H24.5M7.5 16H3.5M24.84 7.16L22 10M10 22L7.16 24.84M24.84 24.84L22 22M10 10L7.16 7.16"
          className="weather-glyph__stroke"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "cloud") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M10.5 24.5H22A5.5 5.5 0 0 0 22 13.5A7.5 7.5 0 0 0 7.3 15.7A4.5 4.5 0 0 0 10.5 24.5Z"
          className="weather-glyph__stroke"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "mist") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M6 11.5H26M4 16H24M8 20.5H28"
          className="weather-glyph__stroke"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "rain") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M10.5 18.5H22A5.5 5.5 0 0 0 22 7.5A7.5 7.5 0 0 0 7.3 9.7A4.5 4.5 0 0 0 10.5 18.5Z"
          className="weather-glyph__stroke"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 21.5L10 25M17 21.5L15.5 25M22.5 21.5L21 25"
          className="weather-glyph__stroke"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "snow") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M10.5 17.5H22A5.5 5.5 0 0 0 22 6.5A7.5 7.5 0 0 0 7.3 8.7A4.5 4.5 0 0 0 10.5 17.5Z"
          className="weather-glyph__stroke"
          strokeLinejoin="round"
        />
        <path
          d="M12 22.5H17M14.5 20V25M20 23.5H24M22 21.5V25.5"
          className="weather-glyph__stroke"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M10.5 18.5H22A5.5 5.5 0 0 0 22 7.5A7.5 7.5 0 0 0 7.3 9.7A4.5 4.5 0 0 0 10.5 18.5Z"
        className="weather-glyph__stroke"
        strokeLinejoin="round"
      />
      <path
        d="M15 20L12.5 25H17L15.5 29"
        className="weather-glyph__stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const formatHourLabel = (hour) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
  }).format(new Date(`2024-01-01T${String(hour).padStart(2, "0")}:00:00`));

const formatDateLabel = (dateString, options) =>
  new Intl.DateTimeFormat(undefined, options).format(new Date(dateString));

const buildForecastDays = (hourly) => {
  const groupedDays = new Map();

  hourly.time.forEach((time, index) => {
    const dayKey = time.slice(0, 10);
    const timestamp = new Date(time);

    if (!groupedDays.has(dayKey)) {
      groupedDays.set(dayKey, []);
    }

    groupedDays.get(dayKey).push({
      hour: timestamp.getHours(),
      temperature: Math.round(hourly.temperature_2m[index]),
      code: hourly.weather_code[index],
    });
  });

  return Array.from(groupedDays.entries())
    .slice(0, 5)
    .map(([dayKey, entries]) => {
      const temperatures = entries.map((entry) => entry.temperature);
      const pickClosestEntry = (slot) =>
        entries.reduce((closestEntry, currentEntry) => {
          if (!closestEntry) {
            return currentEntry;
          }

          return Math.abs(currentEntry.hour - slot) < Math.abs(closestEntry.hour - slot)
            ? currentEntry
            : closestEntry;
        }, null);
      const highlightHours = HOUR_SLOTS.map(
        (slot) => entries.find((entry) => entry.hour === slot) || pickClosestEntry(slot),
      ).filter(Boolean);
      const middayEntry =
        entries.find((entry) => entry.hour === 12) ||
        entries.find((entry) => entry.hour === 15) ||
        entries[Math.floor(entries.length / 2)];
      const weather = weatherForCode(middayEntry.code);

      return {
        key: dayKey,
        label: new Intl.DateTimeFormat(undefined, {
          weekday: "short",
        }).format(new Date(`${dayKey}T12:00:00`)),
        dateLabel: new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
        }).format(new Date(`${dayKey}T12:00:00`)),
        high: Math.max(...temperatures),
        low: Math.min(...temperatures),
        weather,
        entries: highlightHours,
      };
    });
};

function App() {
  const inputId = useId();
  const listboxId = `${inputId}-suggestions`;
  const requestIdRef = useRef(0);
  const blurTimeoutRef = useRef(null);

  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isForecastLoading, setIsForecastLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [forecastError, setForecastError] = useState("");
  const [forecastDays, setForecastDays] = useState([]);

  const showSuggestions =
    isInputFocused && query.trim().length >= 2 && suggestions.length > 0 && !selectedPlace;

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        window.clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (selectedPlace || trimmedQuery.length < 2) {
      setSuggestions([]);
      setSearchError("");
      setIsSearching(false);
      setActiveSuggestionIndex(-1);
      return undefined;
    }

    const controller = new AbortController();
    const currentRequestId = ++requestIdRef.current;
    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");

      try {
        const response = await fetch(
          `${SEARCH_ENDPOINT}?name=${encodeURIComponent(trimmedQuery)}&count=${MAX_SUGGESTIONS}&language=en&format=json`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = await response.json();

        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        const nextSuggestions = (data.results || []).map((place) => ({
          id: `${place.id}-${place.latitude}-${place.longitude}`,
          label: formatLocationLabel(place),
          latitude: place.latitude,
          longitude: place.longitude,
          timezone: place.timezone || "auto",
        }));

        setSuggestions(nextSuggestions);
        setActiveSuggestionIndex(nextSuggestions.length > 0 ? 0 : -1);
        if (nextSuggestions.length === 0) {
          setSearchError("No matching cities found.");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setSuggestions([]);
          setSearchError("City search is unavailable right now.");
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsSearching(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query, selectedPlace]);

  const currentSummary = useMemo(() => {
    if (forecastDays.length === 0) {
      return null;
    }

    const today = forecastDays[0];
    return `${today.weather.label} today, with temperatures between ${today.low}° and ${today.high}°.`;
  }, [forecastDays]);

  const forecastRangeLabel = useMemo(() => {
    if (forecastDays.length === 0) {
      return "";
    }

    const firstDay = forecastDays[0].key;
    const lastDay = forecastDays[forecastDays.length - 1].key;
    const firstLabel = formatDateLabel(`${firstDay}T12:00:00`, {
      month: "short",
      day: "numeric",
    });
    const lastLabel = formatDateLabel(`${lastDay}T12:00:00`, {
      month: "short",
      day: "numeric",
    });
    return `${firstLabel} - ${lastLabel}`;
  }, [forecastDays]);

  const shouldShowSummary = selectedPlace || isForecastLoading || forecastError;
  const showInlineEmptyState = !isForecastLoading && forecastDays.length === 0;
  const helperText = searchError
    ? searchError
    : query.trim().length >= 2
      ? "Use arrow keys to choose a result and press enter to load the forecast."
      : "Type at least two letters to search for a city.";

  const loadForecast = async (place) => {
    setSelectedPlace(place);
    setQuery(place.label);
    setSuggestions([]);
    setSearchError("");
    setForecastError("");
    setIsForecastLoading(true);

    try {
      const response = await fetch(
        `${FORECAST_ENDPOINT}?latitude=${place.latitude}&longitude=${place.longitude}&hourly=temperature_2m,weather_code&forecast_days=5&timezone=auto`,
      );

      if (!response.ok) {
        throw new Error("Forecast request failed");
      }

      const data = await response.json();
      setForecastDays(buildForecastDays(data.hourly));
    } catch (error) {
      setForecastDays([]);
      setForecastError("Forecast data could not be loaded.");
    } finally {
      setIsForecastLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSelectedPlace(null);
    setForecastDays([]);
    setForecastError("");
  };

  const handleInputKeyDown = (event) => {
    if (!showSuggestions) {
      if (event.key === "Escape") {
        setSuggestions([]);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestionIndex((currentIndex) =>
        currentIndex >= suggestions.length - 1 ? 0 : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestionIndex((currentIndex) =>
        currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1,
      );
    }

    if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      event.preventDefault();
      loadForecast(suggestions[activeSuggestionIndex]);
    }

    if (event.key === "Escape") {
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  return (
    <main className="weather-shell">
      <section className="weather-app" aria-labelledby="weather-app-title">
        <div className="weather-stage">
          <div className="weather-app__intro">
            <p className="weather-app__eyebrow">Weather</p>
            <h1 id="weather-app-title" className="weather-app__title">
              Search any city and read the next five days at a glance.
            </h1>
            <p className="weather-app__lede">
              Fast location lookup, compact forecast cards, and a cleaner daily rhythm on every screen.
            </p>
          </div>

          <div className="weather-stage__aside">
            <section className="weather-panel" aria-label="Location search and forecast">
              <div className="weather-search">
                <label className="weather-search__label" htmlFor={inputId}>
                  City
                </label>
                <div className="weather-search__field-wrap">
                  <input
                    id={inputId}
                    className="weather-search__input"
                    type="text"
                    value={query}
                    placeholder="Start typing a city"
                    autoComplete="off"
                    spellCheck="false"
                    aria-autocomplete="list"
                    aria-controls={listboxId}
                    aria-expanded={showSuggestions}
                    aria-activedescendant={
                      showSuggestions && activeSuggestionIndex >= 0
                        ? `${listboxId}-option-${activeSuggestionIndex}`
                        : undefined
                    }
                    onChange={handleInputChange}
                    onFocus={() => {
                      if (blurTimeoutRef.current) {
                        window.clearTimeout(blurTimeoutRef.current);
                      }
                      setIsInputFocused(true);
                    }}
                    onBlur={() => {
                      blurTimeoutRef.current = window.setTimeout(() => {
                        setIsInputFocused(false);
                      }, 120);
                    }}
                    onKeyDown={handleInputKeyDown}
                  />
                  <div className="weather-search__status" aria-live="polite">
                    {isSearching
                      ? "Searching cities..."
                      : selectedPlace
                        ? `Forecast locked to ${selectedPlace.label}`
                        : ""}
                  </div>
                </div>

                <div className="weather-search__messages" aria-live="polite">
                  {!selectedPlace ? <p className="weather-search__hint">{helperText}</p> : null}
                </div>

                <ul
                  id={listboxId}
                  className={`weather-search__suggestions${showSuggestions ? " is-visible" : ""}`}
                  role="listbox"
                  aria-label="City suggestions"
                >
                  {suggestions.map((suggestion, index) => (
                    <li key={suggestion.id} role="presentation">
                      <button
                        id={`${listboxId}-option-${index}`}
                        type="button"
                        role="option"
                        aria-selected={index === activeSuggestionIndex}
                        className={`weather-search__suggestion${
                          index === activeSuggestionIndex ? " is-active" : ""
                        }`}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        onClick={() => loadForecast(suggestion)}
                      >
                        <span className="weather-search__suggestion-copy">
                          <span className="weather-search__suggestion-title">
                            {suggestion.label.split(",")[0]}
                          </span>
                          <span className="weather-search__suggestion-subtitle">
                            {suggestion.label.split(",").slice(1).join(",").trim() || "Load forecast"}
                          </span>
                        </span>
                        <span className="weather-search__suggestion-meta">Enter</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {shouldShowSummary ? (
                <div className="weather-summary" aria-live="polite">
                  <div className="weather-summary__meta">
                    <p className="weather-summary__eyebrow">
                      {forecastRangeLabel || "Five-day outlook"}
                      {selectedPlace?.timezone ? ` · ${selectedPlace.timezone}` : ""}
                    </p>
                    <p className="weather-summary__location">
                      {selectedPlace ? selectedPlace.label : "Updating forecast"}
                    </p>
                    <p className="weather-summary__status">
                      {isForecastLoading
                        ? "Loading forecast..."
                        : forecastError || currentSummary}
                    </p>
                  </div>

                  {selectedPlace && !forecastError ? (
                    <button
                      type="button"
                      className="weather-summary__reset"
                      onClick={() => {
                        setSelectedPlace(null);
                        setQuery("");
                        setSuggestions([]);
                        setForecastDays([]);
                        setForecastError("");
                        setSearchError("");
                      }}
                    >
                      Search again
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="weather-panel__prompt">
                  <p className="weather-panel__prompt-label">Quick start</p>
                  <p className="weather-panel__prompt-copy">
                    Search for a city to load a five-day temperature rhythm with key daytime checkpoints.
                  </p>
                </div>
              )}
            </section>

            {showInlineEmptyState ? (
              <div className="forecast-empty forecast-empty--inline">
                <p className="forecast-empty__eyebrow">Five-day outlook</p>
                <p className="forecast-empty__title">Search for a city to reveal the week ahead.</p>
                <p className="forecast-empty__body">
                  Daily cards will appear here with high and low temperatures, weather conditions,
                  and six key daytime checkpoints.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="forecast-grid" aria-live="polite">
            {isForecastLoading
              ? LOADING_CARDS.map((cardKey) => (
                  <article
                    key={cardKey}
                    className="forecast-card forecast-card--loading"
                    aria-hidden="true"
                  >
                    <div className="forecast-card__loading-line forecast-card__loading-line--short" />
                    <div className="forecast-card__loading-line forecast-card__loading-line--tiny" />
                    <div className="forecast-card__loading-block" />
                    <div className="forecast-card__loading-stack">
                      <div className="forecast-card__loading-row" />
                      <div className="forecast-card__loading-row" />
                      <div className="forecast-card__loading-row" />
                      <div className="forecast-card__loading-row" />
                    </div>
                  </article>
                ))
              : null}
            {forecastDays.map((day, index) => (
              <article
                key={day.key}
                className={`forecast-card forecast-card--${day.weather.tone}`}
              >
                <div className="forecast-card__header">
                  <div>
                    <div className="forecast-card__day-row">
                      <p className="forecast-card__day">{day.label}</p>
                      {index === 0 ? <span className="forecast-card__marker">Today</span> : null}
                    </div>
                    <p className="forecast-card__date">{day.dateLabel}</p>
                  </div>
                  <div className="forecast-card__condition">
                    <span className="forecast-card__icon" aria-hidden="true">
                      <WeatherGlyph tone={day.weather.tone} />
                    </span>
                    <div className={`forecast-card__badge forecast-card__badge--${day.weather.tone}`}>
                      {day.weather.label}
                    </div>
                  </div>
                </div>

                <div className="forecast-card__range" aria-label={`High ${day.high} degrees, low ${day.low} degrees`}>
                  <div>
                    <span className="forecast-card__range-label">High</span>
                    <span className="forecast-card__high">{day.high}°</span>
                  </div>
                  <div>
                    <span className="forecast-card__range-label">Low</span>
                    <span className="forecast-card__low">{day.low}°</span>
                  </div>
                </div>

                <div className="forecast-card__entries">
                  {day.entries.map((entry) => (
                    <div key={`${day.key}-${entry.hour}`} className="forecast-card__entry">
                      <span className="forecast-card__hour">{formatHourLabel(entry.hour)}</span>
                      <span className="forecast-card__temperature">{entry.temperature}°</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}

          </div>
      </section>
    </main>
  );
}

export default App;
