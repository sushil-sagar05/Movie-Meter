import gzip
import pickle

input_file = 'final_df_data.pkl'  
output_file = 'final_df_data.pkl.gz'  


with open(input_file, 'rb') as f_in:
    with gzip.open(output_file, 'wb') as f_out:
        f_out.writelines(f_in)

print(f"File '{input_file}' has been compressed to '{output_file}'")
