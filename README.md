# Forest Cover
1. Problem and Motivation
Forests are a vital component of Earth’s ecosystems. They regulate climate, support biodiversity, and serve as carbon sinks. However, deforestation and forest degradation have accelerated globally, driven by agricultural expansion, urban development, and natural disasters like wildfires. These changes are unevenly distributed across countries and regions, making it difficult to assess and communicate the relative contributions of natural versus human-induced forest loss. While scientific modeling can reveal long-term trends, model outputs often remain inaccessible or abstract for decision-makers and the general public.

The motivation behind building this visualization dashboard was to bridge the gap between mathematical forest cover modeling and intuitive understanding. Specifically, this dashboard transforms a complex forest dynamics model (built using differential equations in MATLAB) into an interactive, user-friendly web visualization that highlights deforestation trends between 2010 and 2020. It empowers users to explore deforestation data country by country, state by state, and across multiple visual formats—making the problem tangible, localized, and actionable.

2. Users
The primary envisioned users of this dashboard include:

Environmental policymakers: Government agencies and legislative bodies evaluating land use policy, forest management, or conservation efforts.

Researchers and academics: Individuals studying land cover change, sustainability modeling, or climate policy.

Non-governmental organizations (NGOs): Environmental advocacy groups looking to communicate evidence-based insights to the public.

Educators and students: For use in classrooms or academic projects to understand forest dynamics across different countries.

The general public: Particularly those interested in environmental awareness, regional sustainability, or community-level land use impact.

Each group can derive different forms of insight—from identifying hotspots of tree loss, to comparing gain/loss across states, to understanding the proportional contribution of human activities.

3. Specific Visualization Goals
The dashboard was designed with the following goals in mind:

Enable comparative analysis of forest cover loss across multiple countries (Brazil, India, China, USA) and their subnational regions.

Visualize the impact of human activity (agriculture, urbanization, wildfire) versus natural causes of forest loss through an intuitive pie chart.

Allow users to explore trends over time, particularly tree cover loss between 2010 and 2020, using line charts for regional insight.

Highlight forest gain efforts, using a bar chart to identify which regions made gains and how those compare to total loss.

Present modeling outputs visually for non-technical users who may not engage with raw data or differential equations.

Encourage learning and engagement by making the dashboard highly interactive with tooltips, dropdowns, and smooth transitions.

Ultimately, the goal is to promote transparency and understanding of deforestation trends in a visually compelling and accessible way.

4. Process
The development of the dashboard followed a structured and iterative process:

Step 1: Data Collection and Modeling
Forest cover data was collected from Global Forest Watch and Our World in Data.

A mathematical model based on a differential equation was implemented in MATLAB to simulate forest cover change under natural and human-influenced scenarios.

Outputs included forest area in hectares, average yearly losses, and breakdowns by cause (agriculture, urbanization, wildfire).

Step 2: Prototyping and Design
Initial sketches were drawn to design the layout (dual-pane view, dropdowns, chart areas).

Data was organized into CSV files (enve-main1.csv, enve-main2.csv) and normalized for frontend use.

Step 3: Development
The dashboard was built using:

HTML & CSS: For layout and styling

D3.js (v6): For all interactive charts

JavaScript: To manage state, dropdown interaction, and chart updates

Tooltips, dynamic labels, and transitions were added for interactivity.

Step 4: Feedback and Refinement
User feedback was collected from peers and instructors.

Based on suggestions, the layout was improved (split view with country/state filters), tooltip positions were refined, and legends/titles were clarified.

Step 5: Hosting
The project was hosted on Netlify at https://forest-cover-change.netlify.app

5. Description of the Dashboard
The dashboard interface is organized into two interactive panels: a country-based view (left) and a state-based view (right).

A. Country Panel (Left)
Country Dropdown: Allows the user to select one of the four countries.

Scatter Plot (Initial Area vs Total Loss):

Each dot represents a subnational region.

X-axis: Initial forest area in 2010

Y-axis: Cumulative forest loss from 2010–2020

Hovering over a dot reveals region-specific values.

Bar Chart (Forest Gain by State):

Highlights how much tree cover was regained by each region during the decade.

Useful to identify successful afforestation programs.

B. State Panel (Right)
State Dropdown: Updates dynamically based on the selected country.

Line Chart (Tree Cover Loss Over Time):

Plots tree loss year-by-year (2010–2020) for a selected region.

Shows the progression and intensity of loss events.

Pie Chart (Tree Cover Loss Breakdown):

Compares loss due to Human Intervention (sum of agriculture, urban, wildfire) vs Natural Causes.

Sourced from a separate dataset for each country.

Color-coded and fully interactive with tooltips.

C. Tooltip System
Custom floating tooltip displays exact values and labels for each visual element.

Smooth transitions allow for better interpretation of data without clutter.
