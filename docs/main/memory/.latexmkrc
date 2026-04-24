# .latexmkrc — xelatex + makeglossaries + output to build/aux

$pdf_mode = 5;          # use xelatex
$out_dir  = 'build/aux';
$aux_dir  = 'build/aux';

add_cus_dep('glo', 'gls', 0, 'run_makeglossaries');
add_cus_dep('acn', 'acr', 0, 'run_makeglossaries');

sub run_makeglossaries {
    my ($base_name, $path) = fileparse($_[0]);
    return system("makeglossaries -d \"$path\" \"$base_name\"");
}

push @generated_exts, 'glo', 'gls', 'glg', 'acn', 'acr', 'alg';
$clean_ext .= ' %R.ist %R.xdy';
