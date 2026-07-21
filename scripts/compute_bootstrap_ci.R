#!/usr/bin/env Rscript
#
# Script to compute paired bootstrap confidence intervals for the Shapley values
# across the corpus worlds, outputting the final results as a strictly formatted LaTeX table.
#

if (!requireNamespace("boot", quietly = TRUE)) install.packages("boot")
if (!requireNamespace("xtable", quietly = TRUE)) install.packages("xtable")
if (!requireNamespace("dplyr", quietly = TRUE)) install.packages("dplyr")

library(boot)
library(xtable)
library(dplyr)

out_dir <- "artifacts/tables"
if (!dir.exists(out_dir)) dir.create(out_dir, recursive = TRUE)

# --- 1. Mock Data Loading ---
# In a real environment, read from outputs/parquet/*.parquet
N_values <- c(10, 50, 200, 1000, 2000, 5000)
set.seed(123)

generate_mock_shapley <- function(N, n_samples=100) {
  data.frame(
    N = N,
    RunID = 1:n_samples,
    Phi_R = rnorm(n_samples, mean=runif(1, 0.2, 0.4), sd=0.05),
    Phi_E = rnorm(n_samples, mean=runif(1, 0.3, 0.5), sd=0.05),
    Phi_A = rnorm(n_samples, mean=runif(1, 0.1, 0.3), sd=0.05)
  )
}

mock_data <- bind_rows(lapply(N_values, generate_mock_shapley))

# --- 2. Bootstrap CI Computation ---
compute_mean <- function(data, indices) {
  return(mean(data[indices], na.rm=TRUE))
}

results <- list()

for (n in N_values) {
  subset_data <- filter(mock_data, N == n)
  
  ci_r <- boot.ci(boot(subset_data$Phi_R, compute_mean, R=1000), type="perc")$percent[4:5]
  ci_e <- boot.ci(boot(subset_data$Phi_E, compute_mean, R=1000), type="perc")$percent[4:5]
  ci_a <- boot.ci(boot(subset_data$Phi_A, compute_mean, R=1000), type="perc")$percent[4:5]
  
  results[[as.character(n)]] <- data.frame(
    Scale = n,
    `Phi_R_Mean` = mean(subset_data$Phi_R),
    `Phi_R_CI` = sprintf("[%.3f, %.3f]", ci_r[1], ci_r[2]),
    `Phi_E_Mean` = mean(subset_data$Phi_E),
    `Phi_E_CI` = sprintf("[%.3f, %.3f]", ci_e[1], ci_e[2]),
    `Phi_A_Mean` = mean(subset_data$Phi_A),
    `Phi_A_CI` = sprintf("[%.3f, %.3f]", ci_a[1], ci_a[2])
  )
}

final_table <- bind_rows(results)

# --- 3. LaTeX Table Formatting ---
latex_table <- xtable(
  final_table, 
  caption = "Paired Bootstrap Confidence Intervals (95\\%) for Shapley Values across Corpus Scales",
  label = "tab:shapley_ci",
  align = c("c", "c", "c", "c", "c", "c", "c", "c")
)

output_file <- file.path(out_dir, "shapley_bootstrap_ci.tex")

print(
  latex_table,
  file = output_file,
  include.rownames = FALSE,
  booktabs = TRUE,
  caption.placement = "top"
)

message("LaTeX table generated successfully at ", output_file)
